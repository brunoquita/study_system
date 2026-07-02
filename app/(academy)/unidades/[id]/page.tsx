import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock3,
  FileText,
  NotebookPen,
  Play,
  Target
} from "lucide-react";
import {
  completeUnit,
  createNote,
  logStudySession,
  toggleMaterial,
  updateMastery
} from "@/app/actions/academy";
import { Panel } from "@/components/Panel";
import { ProgressBar } from "@/components/ProgressBar";
import { Shell } from "@/components/Shell";
import { formatMinutes, getUnitById, masteryLevelLabel, statusLabel } from "@/lib/academy";

export const dynamic = "force-dynamic";

export default async function UnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = await getUnitById(id);
  if (!unit) notFound();

  const studiedMinutes = unit.sessions.reduce((sum, session) => sum + session.minutes, 0);

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/disciplinas/${unit.discipline.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
        >
          <ArrowLeft size={17} />
          {unit.discipline.title}
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                Unidade {unit.order}
              </span>
              <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-300">
                {statusLabel(unit.status)}
              </span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold text-white">{unit.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{unit.objective}</p>
          </div>

          <aside className="premium-border rounded-lg bg-panel/80 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Progress</span>
              <span className="text-2xl font-semibold text-white">{unit.progressPercentage}%</span>
            </div>
            <div className="mt-4">
              <ProgressBar value={unit.progressPercentage} />
            </div>
            <p className="mt-4 rounded-lg bg-white/[0.04] p-3 text-sm text-slate-300">
              {masteryLevelLabel(unit.masteryLevel)}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniStat label="Estudado" value={formatMinutes(studiedMinutes)} icon={<Clock3 size={17} />} />
              <MiniStat label="Estimado" value={formatMinutes(unit.estimatedMinutes)} icon={<Target size={17} />} />
            </div>
            <form action={completeUnit} className="mt-5">
              <input type="hidden" name="unitId" value={unit.id} />
              <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald px-4 text-sm font-semibold text-graphite transition hover:bg-white">
                <Check size={17} />
                Marcar como concluída
              </button>
            </form>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Panel title="Materiais de estudo" icon={<BookOpen size={20} />}>
              <div className="mb-4 rounded-lg border border-cyan/20 bg-cyan/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Main Material</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{unit.mainMaterial}</p>
              </div>
              <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Complementary Materials
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-slate-300">
                  {unit.complementaryMaterials.map((material) => (
                    <li key={material}>• {material}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-5 rounded-lg border border-emerald/20 bg-emerald/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Completion Criteria</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{unit.completionCriteria}</p>
              </div>
              <div className="grid gap-3">
                {unit.materials.map((material) => (
                  <form
                    key={material.id}
                    action={toggleMaterial}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  >
                    <input type="hidden" name="materialId" value={material.id} />
                    <input type="hidden" name="unitId" value={unit.id} />
                    <input type="hidden" name="completed" value={String(material.completed)} />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{material.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{material.description}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                          {material.type} • {formatMinutes(material.durationMin)}
                        </p>
                      </div>
                      <button
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${
                          material.completed
                            ? "border-emerald/40 bg-emerald/15 text-emerald"
                            : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                        }`}
                        title={material.completed ? "Material concluído" : "Marcar material"}
                      >
                        <Check size={18} />
                      </button>
                    </div>
                  </form>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel title="Registrar sessão" icon={<Play size={20} />}>
              <form action={logStudySession} className="grid gap-3">
                <input type="hidden" name="unitId" value={unit.id} />
                <label className="grid gap-2 text-sm text-slate-300">
                  Minutos
                  <input
                    name="minutes"
                    type="number"
                    min="1"
                    defaultValue="45"
                    className="h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-white outline-none focus:border-cyan"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  What I Studied
                  <input
                    name="whatIStudied"
                    defaultValue={unit.title}
                    className="h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-white outline-none focus:border-cyan"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  What I Learned
                  <textarea
                    name="whatILearned"
                    rows={3}
                    className="resize-none rounded-lg border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-cyan"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  What I Need To Review
                  <textarea
                    name="whatINeedToReview"
                    rows={3}
                    className="resize-none rounded-lg border border-white/10 bg-white/[0.04] p-3 text-white outline-none focus:border-cyan"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Next Step
                  <input
                    name="nextStep"
                    className="h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-white outline-none focus:border-cyan"
                  />
                </label>
                <button className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-graphite transition hover:bg-white">
                  <Clock3 size={17} />
                  Registrar estudo
                </button>
              </form>
            </Panel>

            <Panel title="Ajustar domínio" icon={<Target size={20} />}>
              <form action={updateMastery} className="grid gap-3">
                <input type="hidden" name="unitId" value={unit.id} />
                <input
                  name="masteryLevel"
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  defaultValue={unit.masteryLevel}
                  className="accent-cyan"
                />
                <p className="text-sm text-slate-400">{masteryLevelLabel(unit.masteryLevel)}</p>
                <button className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-white transition hover:bg-white/10">
                  Salvar domínio
                </button>
              </form>
            </Panel>

            <Panel title="Notas" icon={<NotebookPen size={20} />}>
              <form action={createNote} className="grid gap-3">
                <input type="hidden" name="unitId" value={unit.id} />
                <input
                  name="title"
                  placeholder="Título da nota"
                  className="h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
                />
                <textarea
                  name="body"
                  placeholder="Insight, dúvida, resumo ou decisão técnica"
                  rows={5}
                  className="resize-none rounded-lg border border-white/10 bg-white/[0.04] p-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
                />
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-graphite transition hover:bg-cyan">
                  <FileText size={17} />
                  Criar nota
                </button>
              </form>
              <div className="mt-5 grid gap-3">
                {unit.notes.map((note) => (
                  <article key={note.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="font-semibold text-white">{note.title}</h3>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{note.body}</p>
                  </article>
                ))}
              </div>
            </Panel>

            <Panel title="Histórico" icon={<Clock3 size={20} />}>
              <div className="grid gap-3">
                {unit.sessions.length ? (
                  unit.sessions.map((session) => (
                    <div key={session.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-semibold text-white">{formatMinutes(session.minutes)}</p>
                      <p className="mt-1 text-sm text-slate-400">Studied: {session.whatIStudied}</p>
                      <p className="mt-2 text-sm text-slate-400">Learned: {session.whatILearned}</p>
                      <p className="mt-2 text-sm text-slate-400">Review: {session.whatINeedToReview}</p>
                      <p className="mt-2 text-sm text-cyan">Next: {session.nextStep}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-slate-400">Nenhuma sessão registrada nesta unidade.</p>
                )}
              </div>
            </Panel>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div className="text-cyan">{icon}</div>
      <p className="mt-3 text-sm font-semibold text-white">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
