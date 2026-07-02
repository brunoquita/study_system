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

export async function createNote(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const unitId = String(formData.get("unitId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!unitId || !title || !body) return;

  await prisma.note.create({
    data: { unitId, title, body }
  });

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

export async function toggleExercise(formData: FormData) {
  if (!process.env.DATABASE_URL) return;

  const exerciseId = String(formData.get("exerciseId") ?? "");
  const unitId = String(formData.get("unitId") ?? "");
  const completed = String(formData.get("completed") ?? "") === "true";

  if (!exerciseId) return;

  await prisma.exercise.update({
    where: { id: exerciseId },
    data: { completed: !completed }
  });

  revalidatePath("/");
  if (unitId) revalidatePath(`/unidades/${unitId}`);
}
