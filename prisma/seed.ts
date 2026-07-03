import { AcademicStatus, MaterialType, PrismaClient } from "@prisma/client";
import { curriculum, slugify } from "../lib/curriculum";

const prisma = new PrismaClient();

const masteryDescription: Record<number, string> = {
  1: "I know the topic",
  2: "I can use it",
  3: "I can explain it",
  4: "I can teach it"
};

function createUnit({
  title,
  disciplineTitle,
  order,
  references,
  isCurrent = false
}: {
  title: string;
  disciplineTitle: string;
  order: number;
  references: string[];
  isCurrent?: boolean;
}) {
  const progressPercentage = isCurrent ? 60 : 0;
  const masteryLevel = isCurrent ? 2 : 1;

  return {
    title,
    objective: `Understand ${title}, practice it deliberately, and explain how it applies inside ${disciplineTitle}.`,
    summary: `${title} study unit for ${disciplineTitle}, focused on references, notes, and personal study control.`,
    order,
    estimatedMinutes: 180,
    masteryLevel,
    masteryDescription: masteryDescription[masteryLevel],
    progressPercentage,
    status: isCurrent ? AcademicStatus.IN_PROGRESS : AcademicStatus.NOT_STARTED,
    mainMaterial: `${references[0]}: primary study path for ${title}.`,
    complementaryMaterials: references.slice(1),
    completionCriteria: `Review the main material, organize references, write useful notes, and mark ${title} as completed when you feel ready to move on.`,
    isCurrent,
    topics: {
      create: [
        {
          title: `${title} Fundamentals`,
          objective: `Learn the purpose and mental model behind ${title}.`,
          order: 1,
          subtopics: {
            create: [
              {
                title: "Definition",
                objective: `Define ${title} clearly and precisely.`,
                order: 1
              },
              {
                title: "Use Cases",
                objective: `Identify practical situations where ${title} is useful.`,
                order: 2
              },
              {
                title: "Common Mistakes",
                objective: `Recognize typical misunderstandings and implementation traps in ${title}.`,
                order: 3
              }
            ]
          }
        },
        {
          title: `${title} Practice`,
          objective: `Apply ${title} through examples, notes, and deliberate review.`,
          order: 2,
          subtopics: {
            create: [
              {
                title: "Implementation",
                objective: `Implement or model ${title} in code or diagrams.`,
                order: 1
              },
              {
                title: "Review",
                objective: `Review weak points and convert mistakes into notes.`,
                order: 2
              }
            ]
          }
        }
      ]
    },
    materials: {
      create: references.map((reference, index) => ({
        title: reference,
        description: `${reference} reference material for ${title}.`,
        type: index === 0 ? MaterialType.COURSE : MaterialType.DOCUMENTATION,
        durationMin: index === 0 ? 60 : 30,
        order: index + 1
      }))
    },
    notes: {
      create: []
    },
    sessions: {
      create: isCurrent
        ? [
            {
              minutes: 110,
              studiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              whatIStudied: "Arrays, indexing, traversal, and two-pointer reasoning.",
              whatILearned: "Arrays are strongest when indexed access and sequential traversal are central to the solution.",
              whatINeedToReview: "Sliding window edge cases with empty input and one-element arrays.",
              nextStep: "Review three more array references and update personal notes."
            }
          ]
        : []
    }
  };
}

async function main() {
  await prisma.note.deleteMany();
  await prisma.studySession.deleteMany();
  await prisma.studyMaterial.deleteMany();
  await prisma.subtopic.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.discipline.deleteMany();
  await prisma.module.deleteMany();

  for (const [moduleIndex, moduleData] of curriculum.entries()) {
    const isCurrentModule = moduleIndex === 0;
    const disciplines = moduleData.disciplines.map((discipline, disciplineIndex) => {
      const isCurrentDiscipline = moduleIndex === 0 && disciplineIndex === 0;

      return {
        title: discipline.title,
        objective: discipline.objective,
        slug: `${moduleData.slug}-${slugify(discipline.title)}`,
        summary: discipline.objective,
        progressPercentage: isCurrentDiscipline ? 60 : 0,
        status: isCurrentDiscipline ? AcademicStatus.IN_PROGRESS : AcademicStatus.NOT_STARTED,
        order: disciplineIndex + 1,
        isCurrent: isCurrentDiscipline,
        units: {
          create: discipline.units.map((unitTitle, unitIndex) =>
            createUnit({
              title: unitTitle,
              disciplineTitle: discipline.title,
              order: unitIndex + 1,
              references: discipline.references,
              isCurrent: moduleIndex === 0 && disciplineIndex === 0 && unitTitle === "Arrays"
            })
          )
        }
      };
    });

    await prisma.module.create({
      data: {
        title: moduleData.title,
        objective: moduleData.objective,
        slug: moduleData.slug,
        summary: moduleData.objective,
        status: isCurrentModule ? AcademicStatus.IN_PROGRESS : AcademicStatus.NOT_STARTED,
        progressPercentage: isCurrentModule ? 60 : 0,
        totalStudyHours: isCurrentModule ? 1.8 : 0,
        averageMasteryLevel: isCurrentModule ? 2 : 1,
        order: moduleIndex + 1,
        isCurrent: isCurrentModule,
        disciplines: {
          create: disciplines
        }
      }
    });
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
