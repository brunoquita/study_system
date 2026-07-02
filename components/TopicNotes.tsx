"use client";

import { useState } from "react";
import { Check, FilePlus2, Plus } from "lucide-react";

export function TopicNotes({ topicTitle }: { topicTitle: string }) {
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  function addNote() {
    const value = draft.trim();
    if (!value) return;

    setNotes((current) => [value, ...current]);
    setDraft("");
  }

  return (
    <section className="rounded-lg border border-cyan/20 bg-cyan/[0.03] p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-1 text-cyan">
          <FilePlus2 size={19} />
        </span>
        <div>
          <h3 className="font-semibold text-cyan">Anotações e materiais do tópico</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Registre links, dúvidas, materiais e pontos importantes sobre {topicTitle}.
          </p>
        </div>
      </div>

      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={7}
        placeholder="Ex.: Estou estudando pelo NeetCode, revisar Big O de nested loops, link do material, dúvida para pesquisar..."
        className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
      />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">
          Rascunho da sessão atual. Com o banco conectado, isso pode virar nota persistida.
        </p>
        <button
          type="button"
          onClick={addNote}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-graphite transition hover:bg-white"
        >
          <Plus size={16} />
          Salvar anotação
        </button>
      </div>

      {notes.length ? (
        <div className="mt-4 grid gap-3">
          {notes.map((note, index) => (
            <article key={`${note}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald">
                <Check size={14} />
                Anotação salva
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-slate-300">{note}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
