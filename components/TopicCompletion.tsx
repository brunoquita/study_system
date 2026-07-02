"use client";

import { useState } from "react";
import { Check, Circle, Play } from "lucide-react";

type TopicStatus = "not_started" | "in_progress" | "completed";

export function TopicCompletion({
  topicTitle,
  disciplineTitle,
  initialStatus = "not_started"
}: {
  topicTitle: string;
  disciplineTitle: string;
  initialStatus?: TopicStatus;
}) {
  const [status, setStatus] = useState<TopicStatus>(initialStatus);
  const isInProgress = status === "in_progress";
  const isCompleted = status === "completed";

  return (
    <div
      className={`premium-border rounded-lg p-5 transition ${
        isCompleted
          ? "bg-emerald/10 ring-1 ring-emerald/30"
          : isInProgress
            ? "bg-cyan/10 ring-1 ring-cyan/25"
            : "bg-panel/78"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Status do tópico</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{statusLabel(status)}</h2>
        </div>
        <StatusIcon status={status} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">
        {topicTitle} em {disciplineTitle}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setStatus("in_progress")}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition ${
            isInProgress
              ? "border-cyan bg-cyan text-graphite"
              : "border-white/15 bg-white/[0.04] text-white hover:border-cyan/50 hover:bg-white/10"
          }`}
          aria-pressed={isInProgress}
        >
          {isInProgress ? <Check size={17} /> : <Play size={17} />}
          Em andamento
        </button>
        <button
          type="button"
          onClick={() => setStatus("completed")}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition ${
            isCompleted
              ? "border-emerald bg-emerald text-graphite"
              : "border-white/15 bg-white/[0.04] text-white hover:border-emerald/50 hover:bg-white/10"
          }`}
          aria-pressed={isCompleted}
        >
          <Check size={17} />
          Concluído
        </button>
      </div>
    </div>
  );
}

function statusLabel(status: TopicStatus) {
  const labels: Record<TopicStatus, string> = {
    not_started: "Não iniciado",
    in_progress: "Em andamento",
    completed: "Concluído"
  };

  return labels[status];
}

function StatusIcon({ status }: { status: TopicStatus }) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";

  return (
    <span
      className={`flex size-12 shrink-0 items-center justify-center rounded-lg border ${
        isCompleted
          ? "border-emerald/50 bg-emerald text-graphite"
          : isInProgress
            ? "border-cyan/50 bg-cyan/15 text-cyan"
            : "border-white/15 bg-white/[0.04] text-slate-300"
      }`}
    >
      {isCompleted ? <Check size={22} /> : isInProgress ? <Play size={22} /> : <Circle size={22} />}
    </span>
  );
}
