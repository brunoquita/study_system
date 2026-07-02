import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { Shell } from "@/components/Shell";
import { formatMinutes, getDisciplineBySlug, masteryLevelLabel, statusLabel } from "@/lib/academy";

export const dynamic = "force-dynamic";

export default async function DisciplinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const discipline = await getDisciplineBySlug(slug);
  if (!discipline) notFound();

  const mastery = Math.round(
    (discipline.units.reduce((sum, unit) => sum + unit.masteryLevel, 0) / Math.max(discipline.units.length, 1)) * 10
  ) / 10;

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white">
          <ArrowLeft size={17} />
          Voltar ao dashboard
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_0.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan">{discipline.module.title}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold text-white">{discipline.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{discipline.objective}</p>
          </div>
          <div className="premium-border rounded-lg bg-panel/80 p-5">
            <p className="text-sm text-slate-400">Progresso da disciplina</p>
            <p className="mt-2 text-4xl font-semibold text-white">{discipline.progressPercentage}%</p>
            <div className="mt-5">
              <ProgressBar value={discipline.progressPercentage} />
            </div>
            <p className="mt-4 text-sm text-slate-400">Domínio médio: {mastery}/4</p>
          </div>
        </section>

        <section className="mt-10 grid gap-4">
          {discipline.units.map((unit) => {
            const studied = unit.sessions.reduce((sum, session) => sum + session.minutes, 0);
            return (
              <Link
                key={unit.id}
                href={`/unidades/${unit.id}`}
                className="premium-border group grid gap-4 rounded-lg bg-panel/78 p-5 transition hover:border-cyan/40 hover:bg-panel md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-300">
                      Unidade {unit.order}
                    </span>
                    <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
                      {statusLabel(unit.status)}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-white">{unit.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{unit.summary}</p>
                  <div className="mt-5 max-w-2xl">
                    <ProgressBar value={unit.progressPercentage} />
                  </div>
                </div>
                <div className="grid min-w-64 gap-3 text-sm text-slate-300 sm:grid-cols-2 md:block md:space-y-3">
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} className="text-amber" />
                    {formatMinutes(studied)} estudados
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className="text-cyan" />
                    {unit.materials.length} materiais
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald" />
                    {masteryLevelLabel(unit.masteryLevel)}
                  </span>
                  <span className="inline-flex items-center gap-2 font-medium text-cyan">
                    Abrir
                    <ArrowRight className="transition group-hover:translate-x-1" size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </Shell>
  );
}
