import { AcademicStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.note.deleteMany(),
    prisma.studySession.deleteMany(),
    prisma.studyMaterial.updateMany({
      data: { completed: false }
    }),
    prisma.unit.updateMany({
      data: {
        status: AcademicStatus.NOT_STARTED,
        progressPercentage: 0,
        masteryLevel: 1,
        masteryDescription: "I know the topic",
        isCurrent: false
      }
    }),
    prisma.discipline.updateMany({
      data: {
        status: AcademicStatus.NOT_STARTED,
        progressPercentage: 0,
        isCurrent: false
      }
    }),
    prisma.module.updateMany({
      data: {
        status: AcademicStatus.NOT_STARTED,
        progressPercentage: 0,
        totalStudyHours: 0,
        averageMasteryLevel: 1,
        isCurrent: false
      }
    })
  ]);
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
