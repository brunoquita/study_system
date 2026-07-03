import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        database: "missing",
        message: "DATABASE_URL is not configured."
      },
      { status: 500 }
    );
  }

  try {
    const [modules, disciplines, units] = await Promise.all([
      prisma.module.count(),
      prisma.discipline.count(),
      prisma.unit.count()
    ]);

    return NextResponse.json({
      ok: true,
      database: "connected",
      modules,
      disciplines,
      units
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error.";

    return NextResponse.json(
      {
        ok: false,
        database: "error",
        message
      },
      { status: 500 }
    );
  }
}
