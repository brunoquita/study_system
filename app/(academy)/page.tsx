import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Clock3, Gauge, Layers3, Lock } from "lucide-react";
import { DisciplineCard } from "@/components/DisciplineCard";
import { MetricCard } from "@/components/MetricCard";
import { Shell } from "@/components/Shell";
import { getDashboardData } from "@/lib/academy";
import { curriculum } from "@/lib/curriculum";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <Shell>
      <main>
        <section className="relative overflow-hidden">
          <Image
            src="/images/academy-hero.png"
            alt="Ambiente digital premium de estudos em tecnologia"
            fill
            priority
            className="object-cover opacity-42"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/82 to-graphite/20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-graphite to-transparent" />
          <div className="relative mx-auto grid min-h-[520px] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                Pós-graduação pessoal em tecnologia
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Sistema Acadêmico Bruno Rocha
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Uma plataforma de estudos avançados para fundamentos de computação, Swift,
                SwiftUI, arquitetura iOS, backend e IA para devs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#disciplinas"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ver matérias
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Horas estudadas" value={`${data.totalHours}h`} icon={Clock3} tone="cyan" />
            <MetricCard label="Unidades concluídas" value={`${data.completedUnits}`} icon={BookOpenCheck} tone="emerald" />
            <MetricCard label="Em andamento" value={`${data.inProgressUnits}`} icon={Layers3} tone="amber" />
            <MetricCard label="Domínio médio" value={`${data.averageMastery}/4`} icon={Gauge} tone="violet" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="premium-border rounded-lg bg-panel/78 p-5 sm:p-6">
            <p className="text-sm font-medium text-cyan">Estado atual</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Sua sequência acadêmica</h2>
            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              <CurrentRow label="Módulo" value={data.currentModule?.title ?? "Defina um módulo atual"} />
              <CurrentRow label="Disciplina" value={data.currentDiscipline?.title ?? "Defina uma disciplina atual"} />
              <CurrentRow label="Unidade" value={data.currentUnit?.title ?? "Defina uma unidade atual"} />
            </div>
          </div>
        </section>

        <section id="disciplinas" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-cyan">Matérias</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Disciplinas do programa</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Conteúdo organizado como uma plataforma pessoal de estudos, com módulos,
              tópicos, materiais e anotações por unidade.
            </p>
          </div>
          {data.disciplines.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.disciplines.map((discipline) => (
                <DisciplineCard key={discipline.id} discipline={discipline} />
              ))}
            </div>
          ) : (
            <EmptyDisciplines />
          )}
        </section>
      </main>
    </Shell>
  );
}

function EmptyDisciplines() {
  return (
    <div className="premium-border rounded-lg bg-panel/78 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">As matérias aparecem aqui</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            O currículo já está no seed. Como o banco ainda não está configurado nesta sessão,
            abaixo está uma prévia das matérias que serão carregadas após rodar o seed.
          </p>
        </div>
        <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-medium text-amber">
          Banco pendente
        </span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {curriculum.map((module, index) => (
          <ModulePreviewCard key={module.slug} module={module} locked={index > 0} />
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-400">
        Para ver as matérias clicáveis com unidades, tópicos e materiais, configure o Neon e rode
        <span className="font-mono text-slate-200"> npm run db:push </span>
        e
        <span className="font-mono text-slate-200"> npm run db:seed</span>.
      </p>
    </div>
  );
}

function ModulePreviewCard({
  module,
  locked
}: {
  module: (typeof curriculum)[number];
  locked: boolean;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${locked ? "text-slate-500" : "text-cyan"}`}>
          {module.title}
        </p>
        {locked ? (
          <Lock className="text-slate-600" size={17} />
        ) : (
          <ArrowRight className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan" size={17} />
        )}
      </div>
      <p className={`mt-3 text-sm font-medium ${locked ? "text-slate-500" : "text-white"}`}>{module.objective}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {module.disciplines.map((discipline) => (
          <span
            key={discipline.title}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              locked ? "bg-white/[0.04] text-slate-500" : "bg-white/8 text-slate-200"
            }`}
          >
            {discipline.title}
          </span>
        ))}
      </div>
      {locked ? (
        <p className="mt-4 text-xs leading-5 text-amber">Bloqueado até concluir o módulo anterior.</p>
      ) : null}
    </>
  );

  if (locked) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 opacity-80" aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/modulos/${module.slug}`}
      className="group rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan/40 hover:bg-white/[0.06]"
    >
      {content}
    </Link>
  );
}

function CurrentRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
