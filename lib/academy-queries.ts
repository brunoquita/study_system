import { prisma } from "@/lib/prisma";

function emptyDashboardData() {
  return {
    currentModule: null,
    currentDiscipline: null,
    currentUnit: null,
    totalHours: 0,
    completedUnits: 0,
    inProgressUnits: 0,
    averageMastery: 0,
    modules: []
  };
}

export async function getDashboardData() {
  if (!process.env.DATABASE_URL) {
    return emptyDashboardData();
  }

  try {
    const [
      currentModule,
      currentDiscipline,
      currentUnit,
      totalSessions,
      completedUnits,
      inProgressUnits,
      mastery
    ] = await Promise.all([
      prisma.module.findFirst({ where: { isCurrent: true } }),
      prisma.discipline.findFirst({
        where: { isCurrent: true },
        include: { module: true }
      }),
      prisma.unit.findFirst({
        where: { isCurrent: true },
        include: {
          discipline: { include: { module: true } },
          sessions: { orderBy: { studiedAt: "desc" }, take: 1 }
        }
      }),
      prisma.studySession.aggregate({ _sum: { minutes: true } }),
      prisma.unit.count({ where: { status: "COMPLETED" } }),
      prisma.unit.count({ where: { status: "IN_PROGRESS" } }),
      prisma.unit.aggregate({ _avg: { masteryLevel: true } })
    ]);

    const modules = await prisma.module.findMany({
      orderBy: { order: "asc" },
      include: {
        disciplines: {
          orderBy: { order: "asc" },
          include: {
            units: {
              orderBy: { order: "asc" },
              include: { sessions: true, materials: true }
            }
          }
        }
      }
    });

    return {
      currentModule,
      currentDiscipline,
      currentUnit,
      totalHours: Math.round(((totalSessions._sum.minutes ?? 0) / 60) * 10) / 10,
      completedUnits,
      inProgressUnits,
      averageMastery: Math.round((mastery._avg.masteryLevel ?? 1) * 10) / 10,
      modules
    };
  } catch (error) {
    console.error("Failed to load dashboard data", error);
    return emptyDashboardData();
  }
}

export async function getDisciplineBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return null;

  try {
    return await prisma.discipline.findUnique({
      where: { slug },
      include: {
        module: true,
        units: {
          orderBy: { order: "asc" },
          include: {
            materials: { orderBy: { order: "asc" } },
            sessions: true,
            notes: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to load discipline", error);
    return null;
  }
}

export async function getModuleBySlug(slug: string) {
  if (!process.env.DATABASE_URL) return null;

  try {
    return await prisma.module.findUnique({
      where: { slug },
      include: {
        disciplines: {
          orderBy: { order: "asc" },
          include: {
            units: {
              orderBy: { order: "asc" }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to load module", error);
    return null;
  }
}

export async function getModuleUnlockState(slug: string) {
  if (!process.env.DATABASE_URL) {
    return {
      unlocked: slug === "module-1",
      requiredModule: null
    };
  }

  try {
    const module = await prisma.module.findUnique({ where: { slug } });
    if (!module) {
      return {
        unlocked: false,
        requiredModule: null
      };
    }

    const previousModule = await prisma.module.findFirst({
      where: { order: module.order - 1 },
      select: { title: true, slug: true, status: true }
    });

    return {
      unlocked: !previousModule || previousModule.status === "COMPLETED",
      requiredModule: previousModule
    };
  } catch (error) {
    console.error("Failed to load module unlock state", error);
    return {
      unlocked: slug === "module-1",
      requiredModule: null
    };
  }
}

export async function getUnitById(id: string) {
  if (!process.env.DATABASE_URL) return null;

  try {
    return await prisma.unit.findUnique({
      where: { id },
      include: {
        discipline: { include: { module: true } },
        materials: { orderBy: { order: "asc" } },
        notes: { orderBy: { createdAt: "desc" } },
        sessions: { orderBy: { studiedAt: "desc" } }
      }
    });
  } catch (error) {
    console.error("Failed to load unit", error);
    return null;
  }
}
