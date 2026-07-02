import { AcademicStatus, ExerciseType, MaterialType, PrismaClient } from "@prisma/client";
import { curriculum, slugify } from "../lib/curriculum";

const prisma = new PrismaClient();

const masteryDescription: Record<number, string> = {
  1: "I know the topic",
  2: "I can use it",
  3: "I can explain it",
  4: "I can teach it"
};

function technicalEnglishFor(unitTitle: string): [string, string, string, string, string][] {
  const base = unitTitle.toLowerCase();

  return [
    [
      unitTitle,
      unitTitle,
      `Core term for the ${unitTitle} unit.`,
      `Today I studied ${base} and connected it to real software problems.`,
      "core concept"
    ],
    [
      "trade-off",
      "compensação técnica",
      "Used when comparing benefits and costs of a technical decision.",
      `A good engineer explains the trade-off behind using ${base}.`,
      "engineering decision"
    ],
    [
      "constraint",
      "restrição",
      "A limitation or rule that affects implementation choices.",
      `This implementation has a constraint related to ${base}.`,
      "limitation"
    ],
    [
      "edge case",
      "caso de borda",
      "An unusual input or situation that can break a solution.",
      `I need to test the edge cases before saying I understand ${base}.`,
      "boundary condition"
    ],
    [
      "implementation detail",
      "detalhe de implementação",
      "A concrete low-level choice hidden behind a concept or abstraction.",
      `This behavior is an implementation detail of ${base}.`,
      "internal behavior"
    ]
  ];
}

function createUnit({
  title,
  moduleTitle,
  disciplineTitle,
  order,
  references,
  isCurrent = false
}: {
  title: string;
  moduleTitle: string;
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
    summary: `${title} study unit for ${disciplineTitle}, including theory, practice, technical English, and explanation drills.`,
    order,
    estimatedMinutes: 180,
    masteryLevel,
    masteryDescription: masteryDescription[masteryLevel],
    progressPercentage,
    status: isCurrent ? AcademicStatus.IN_PROGRESS : AcademicStatus.NOT_STARTED,
    mainMaterial: `${references[0]}: primary study path for ${title}.`,
    complementaryMaterials: references.slice(1),
    completionCriteria: `Finish the main material, review complementary references, solve at least two exercises, write notes, and explain ${title} out loud in English.`,
    oralExplanationExercise: `Record or speak for 2 minutes explaining ${title}: what it is, when to use it, common mistakes, and one practical example.`,
    importantTerms: technicalEnglishFor(title).map(([term]) => term),
    englishSummary: `${title} is part of ${moduleTitle}. In this unit, the goal is to understand the concept, use it in practice, explain the trade-offs, and communicate the idea in technical English.`,
    isCurrent,
    topics: {
      create: [
        {
          title: `${title} Fundamentals`,
          objective: `Learn the essential vocabulary, purpose, and mental model behind ${title}.`,
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
          objective: `Apply ${title} through exercises, examples, and explanation drills.`,
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
    exercises: {
      create: [
        {
          title: `${title} practice exercise`,
          prompt: `Solve or implement a focused exercise using ${title}, then document the reasoning.`,
          type: ExerciseType.CODE,
          difficulty: 3
        },
        {
          title: `${title} written explanation`,
          prompt: `Write a concise explanation of ${title}, including vocabulary, important terms, and one example sentence.`,
          type: ExerciseType.ESSAY,
          difficulty: 2
        },
        {
          title: `${title} oral explanation`,
          prompt: `Explain ${title} orally in English using the 5 example sentences and important terms.`,
          type: ExerciseType.ESSAY,
          difficulty: 2
        }
      ]
    },
    technicalEnglish: {
      create: technicalEnglishFor(title).map(([term, translation, context, example, vocabulary]) => ({
        term,
        translation,
        context,
        example,
        vocabulary
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
              nextStep: "Solve three more array exercises on LeetCode and explain the trade-offs orally."
            }
          ]
        : []
    }
  };
}

function technicalEnglishDiscipline(moduleTitle: string, moduleObjective: string, order: number) {
  const unitTitle = `Technical English for ${moduleObjective}`;

  return {
    title: "Technical English",
    objective: `Practice vocabulary, example sentences, English summaries, and oral explanation for ${moduleObjective}.`,
    slug: `${slugify(moduleTitle)}-technical-english`,
    summary: `Technical English support for ${moduleTitle}.`,
    progressPercentage: 0,
    status: AcademicStatus.NOT_STARTED,
    order,
    isCurrent: false,
    units: {
      create: [
        createUnit({
          title: unitTitle,
          moduleTitle,
          disciplineTitle: "Technical English",
          order: 1,
          references: ["OpenAI Documentation", "Apple Documentation", "Technical documentation practice"],
          isCurrent: false
        })
      ]
    }
  };
}

async function main() {
  await prisma.note.deleteMany();
  await prisma.technicalEnglish.deleteMany();
  await prisma.studySession.deleteMany();
  await prisma.exercise.deleteMany();
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
              moduleTitle: moduleData.title,
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
          create: [
            ...disciplines,
            technicalEnglishDiscipline(moduleData.title, moduleData.objective, disciplines.length + 1)
          ]
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
