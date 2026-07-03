"use server";

import { revalidatePath } from "next/cache";
import { masteryLevelDescription } from "@/lib/academy-formatters";
import { prisma } from "@/lib/prisma";

export async function logStudySession(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const unitId = String(formData.get("unitId") ?? "");
  const minutes = Number(formData.get("minutes") ?? 0);
  const whatIStudied = String(formData.get("whatIStudied") ?? "").trim();
  const whatILearned = String(formData.get("whatILearned") ?? "").trim();
  const whatINeedToReview = String(formData.get("whatINeedToReview") ?? "").trim();
  const nextStep = String(formData.get("nextStep") ?? "").trim();

  if (!unitId || !Number.isFinite(minutes) || minutes < 1) return;

  await prisma.$transaction(async (tx) => {
    const unit = await tx.unit.findUnique({
      where: { id: unitId },
      select: { progressPercentage: true }
    });

    await tx.studySession.create({
      data: {
        unitId,
        minutes,
        whatIStudied: whatIStudied || "Estudo guiado",
        whatILearned: whatILearned || "Aprendizado registrado na sessão.",
        whatINeedToReview: whatINeedToReview || "Revisar pontos principais da unidade.",
        nextStep: nextStep || "Continuar a próxima sessão planejada."
      }
    });

    await tx.unit.update({
      where: { id: unitId },
      data: {
        status: "IN_PROGRESS",
        isCurrent: true,
        progressPercentage: Math.min((unit?.progressPercentage ?? 0) + 5, 100)
      }
    });

    await tx.unit.updateMany({
      where: { id: { not: unitId } },
      data: { isCurrent: false }
    });
  });

  revalidatePath("/");
  revalidatePath(`/unidades/${unitId}`);
}

export async function updateMastery(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const unitId = String(formData.get("unitId") ?? "");
  const masteryLevel = Number(formData.get("masteryLevel") ?? 1);

  if (!unitId || masteryLevel < 1 || masteryLevel > 4) return;

  await prisma.unit.update({
    where: { id: unitId },
    data: { masteryLevel, masteryDescription: masteryLevelDescription(masteryLevel) }
  });

  revalidatePath("/");
  revalidatePath(`/unidades/${unitId}`);
}

export async function completeUnit(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const unitId = String(formData.get("unitId") ?? "");
  if (!unitId) return;

  await prisma.unit.update({
    where: { id: unitId },
    data: { status: "COMPLETED", progressPercentage: 100 }
  });

  revalidatePath("/");
  revalidatePath(`/unidades/${unitId}`);
}

export async function setUnitStatus(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const unitId = String(formData.get("unitId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!unitId || !["IN_PROGRESS", "COMPLETED"].includes(status)) return;

  const progressPercentage = status === "COMPLETED" ? 100 : 15;

  await prisma.$transaction(async (tx) => {
    const unit = await tx.unit.update({
      where: { id: unitId },
      data: {
        status: status as "IN_PROGRESS" | "COMPLETED",
        progressPercentage,
        isCurrent: status === "IN_PROGRESS"
      },
      select: {
        disciplineId: true,
        discipline: {
          select: {
            moduleId: true
          }
        }
      }
    });

    if (status === "IN_PROGRESS") {
      await tx.unit.updateMany({
        where: { id: { not: unitId } },
        data: { isCurrent: false }
      });
    }

    const disciplineUnits = await tx.unit.findMany({
      where: { disciplineId: unit.disciplineId },
      select: { progressPercentage: true, status: true }
    });

    const disciplineProgress = averageProgress(disciplineUnits.map((item) => item.progressPercentage));
    await tx.discipline.update({
      where: { id: unit.disciplineId },
      data: {
        progressPercentage: disciplineProgress,
        status: aggregateStatus(disciplineUnits.map((item) => item.status))
      }
    });

    const moduleUnits = await tx.unit.findMany({
      where: {
        discipline: {
          moduleId: unit.discipline.moduleId
        }
      },
      select: { progressPercentage: true, status: true, masteryLevel: true, estimatedMinutes: true }
    });

    await tx.module.update({
      where: { id: unit.discipline.moduleId },
      data: {
        progressPercentage: averageProgress(moduleUnits.map((item) => item.progressPercentage)),
        status: aggregateStatus(moduleUnits.map((item) => item.status)),
        averageMasteryLevel: averageNumber(moduleUnits.map((item) => item.masteryLevel)),
        totalStudyHours: Math.round((moduleUnits.reduce((sum, item) => sum + item.estimatedMinutes, 0) / 60) * 10) / 10
      }
    });
  });

  revalidatePath("/");
  revalidatePath(`/unidades/${unitId}`);
}

function averageProgress(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function averageNumber(values: number[]) {
  if (!values.length) return 1;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function aggregateStatus(statuses: string[]) {
  if (statuses.length && statuses.every((status) => status === "COMPLETED")) return "COMPLETED";
  if (statuses.some((status) => status === "IN_PROGRESS" || status === "COMPLETED")) return "IN_PROGRESS";
  return "NOT_STARTED";
}

export async function createNote(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const unitId = String(formData.get("unitId") ?? "");
  const title = String(formData.get("title") ?? "Anotação de estudo").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!unitId || !title || !body) return;

  await prisma.note.create({
    data: { unitId, title, body }
  });

  revalidatePath("/");
  revalidatePath(`/unidades/${unitId}`);
}

export async function toggleMaterial(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const materialId = String(formData.get("materialId") ?? "");
  const unitId = String(formData.get("unitId") ?? "");
  const completed = String(formData.get("completed") ?? "") === "true";

  if (!materialId) return;

  await prisma.studyMaterial.update({
    where: { id: materialId },
    data: { completed: !completed }
  });

  revalidatePath("/");
  if (unitId) revalidatePath(`/unidades/${unitId}`);
}
