import Link from "next/link";
import { ArrowRight, BookMarked, Clock, GraduationCap } from "lucide-react";
import { formatMinutes } from "@/lib/academy";
import { ProgressBar } from "@/components/ProgressBar";

type Discipline = {
  title: string;
  slug: string;
  summary: string;
  progressPercentage: number;
  module: { title: string };
  units: {
    status: string;
    masteryLevel: number;
    estimatedMinutes: number;
    sessions: { minutes: number }[];
    materials: unknown[];
  }[];
};

export function DisciplineCard({ discipline }: { discipline: Discipline }) {
  const totalUnits = discipline.units.length;
  const completed = discipline.units.filter((unit) => unit.status === "COMPLETED").length;
  const estimated = discipline.units.reduce((sum, unit) => sum + unit.estimatedMinutes, 0);

  return (
    <Link
      href={`/disciplinas/${discipline.slug}`}
      className="premium-border group flex h-full flex-col rounded-lg bg-panel/82 p-5 transition hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-panel"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/8 text-cyan">
          <GraduationCap size={21} />
        </span>
        <ArrowRight className="mt-1 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan" size={19} />
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{discipline.module.title}</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{discipline.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{discipline.summary}</p>
      <div className="mt-auto pt-6">
        <ProgressBar value={discipline.progressPercentage} />
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <BookMarked size={16} className="text-emerald" />
            {completed}/{totalUnits} unidades
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-amber" />
            {formatMinutes(estimated)}
          </span>
        </div>
      </div>
    </Link>
  );
}
