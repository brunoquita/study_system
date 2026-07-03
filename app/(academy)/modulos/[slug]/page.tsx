import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { Shell } from "@/components/Shell";
import { getModuleBySlug } from "@/lib/academy";
import { findModule, topicSlug, unitTitle } from "@/lib/curriculum";

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = findModule(slug);
  if (!module) notFound();
  const databaseModule = await getModuleBySlug(slug);
  const hasDatabaseModule = Boolean(databaseModule);
  const disciplines = databaseModule?.disciplines ?? module.disciplines;

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/#disciplinas" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white">
          <ArrowLeft size={17} />
          Voltar para matérias
        </Link>

        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{module.title}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold text-white">{module.objective}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Escolha um tópico de estudo para registrar anotações, organizar materiais
            de referência e acompanhar seu progresso.
          </p>
        </section>

        <section className="mt-10 grid gap-6">
          {disciplines.map((discipline) => (
            <div key={discipline.title} className="premium-border rounded-lg bg-panel/78 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/8 text-cyan">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-white">{discipline.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{discipline.objective}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {discipline.units.map((unit) => {
                  const title = unitTitle(unit);
                  const isObjectUnit = typeof unit !== "string";
                  const href =
                    hasDatabaseModule && isObjectUnit && "id" in unit
                      ? `/unidades/${unit.id}`
                      : `/topicos/${topicSlug(module.slug, discipline.title, title)}`;
                  const progress =
                    hasDatabaseModule && isObjectUnit && "progressPercentage" in unit
                      ? unit.progressPercentage
                      : title === "Arrays"
                        ? 60
                        : 0;

                  return (
                  <Link
                    key={title}
                    href={href}
                    className="group rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <BookOpen size={18} className="mt-1 shrink-0 text-cyan" />
                      <ArrowRight className="mt-1 shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan" size={17} />
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Página de estudo com anotações e referências.</p>
                    <div className="mt-4">
                      <ProgressBar value={progress} />
                    </div>
                  </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
    </Shell>
  );
}
