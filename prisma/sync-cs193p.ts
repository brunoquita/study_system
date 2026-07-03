import { AcademicStatus, MaterialType, PrismaClient } from "@prisma/client";
import { CurriculumReference, cs193p2025Lectures } from "../lib/curriculum";

const prisma = new PrismaClient();

function referenceType(reference: CurriculumReference, index: number) {
  return reference.type ? MaterialType[reference.type] : index === 0 ? MaterialType.VIDEO : MaterialType.DOCUMENTATION;
}

async function main() {
  const discipline = await prisma.discipline.findUnique({
    where: { slug: "module-3-cs193p" },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: { materials: true }
      }
    }
  });

  if (!discipline) {
    throw new Error("CS193p discipline not found. Run the initial database seed first.");
  }

  for (const [index, lecture] of cs193p2025Lectures.entries()) {
    const order = index + 1;
    const existingUnit = discipline.units[index];
    const references = lecture.references ?? [];

    const unit = existingUnit
      ? await prisma.unit.update({
          where: { id: existingUnit.id },
          data: {
            title: lecture.title,
            objective: lecture.objective ?? `Study ${lecture.title} from Stanford CS193p 2025.`,
            summary: `${lecture.title} from Stanford CS193p 2025, with the official lecture video and supporting material.`,
            order,
            estimatedMinutes: lecture.estimatedMinutes ?? 120,
            mainMaterial: references[0]?.title ?? "Stanford CS193p 2025",
            complementaryMaterials: references.slice(1).map((reference) => reference.title),
            completionCriteria: `Watch ${lecture.title}, write notes, and mark the unit as completed when you can explain the main SwiftUI concepts.`
          }
        })
      : await prisma.unit.create({
          data: {
            title: lecture.title,
            objective: lecture.objective ?? `Study ${lecture.title} from Stanford CS193p 2025.`,
            summary: `${lecture.title} from Stanford CS193p 2025, with the official lecture video and supporting material.`,
            order,
            estimatedMinutes: lecture.estimatedMinutes ?? 120,
            masteryLevel: 1,
            masteryDescription: "I know the topic",
            progressPercentage: 0,
            status: AcademicStatus.NOT_STARTED,
            mainMaterial: references[0]?.title ?? "Stanford CS193p 2025",
            complementaryMaterials: references.slice(1).map((reference) => reference.title),
            completionCriteria: `Watch ${lecture.title}, write notes, and mark the unit as completed when you can explain the main SwiftUI concepts.`,
            disciplineId: discipline.id
          }
        });

    await prisma.studyMaterial.deleteMany({
      where: { unitId: unit.id }
    });

    if (references.length) {
      await prisma.studyMaterial.createMany({
        data: references.map((reference, materialIndex) => ({
          title: reference.title,
          description: reference.description ?? `${reference.title} material for ${lecture.title}.`,
          type: referenceType(reference, materialIndex),
          url: reference.url,
          durationMin: reference.durationMin ?? 75,
          order: materialIndex + 1,
          unitId: unit.id
        }))
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
