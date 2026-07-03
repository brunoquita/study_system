"use client";

import { FormEvent, useState, useTransition } from "react";
import { Check, FilePlus2, Plus } from "lucide-react";
import { createNote } from "@/app/actions/academy";

type PersistedNote = {
  id: string;
  title: string;
  body: string;
  createdAt: Date | string;
};

export function TopicNotes({
  topicTitle,
  unitId,
  initialNotes = []
}: {
  topicTitle: string;
  unitId?: string;
  initialNotes?: PersistedNote[];
}) {
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<PersistedNote[]>(initialNotes);
  const [isPending, startTransition] = useTransition();

  function addLocalNote(value: string) {
    setNotes((current) => [
      {
        id: `local-${Date.now()}`,
        title: "Anotação de estudo",
        body: value,
        createdAt: new Date().toISOString()
      },
      ...current
    ]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;

    if (!unitId) {
      addLocalNote(value);
      setDraft("");
      return;
    }

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      await createNote(formData);
      addLocalNote(value);
      setDraft("");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-cyan/20 bg-cyan/[0.03] p-4 sm:p-5">
      <input type="hidden" name="unitId" value={unitId ?? ""} />
      <input type="hidden" name="title" value="Anotação de estudo" />

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
        name="body"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={7}
        placeholder="Ex.: Estou estudando pelo NeetCode, revisar Big O de nested loops, link do material, dúvida para pesquisar..."
        className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
      />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">
          {unitId ? "Anotação salva no banco da plataforma." : "Rascunho temporário desta página."}
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-graphite transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          <Plus size={16} />
          {isPending ? "Salvando..." : "Salvar anotação"}
        </button>
      </div>

      {notes.length ? (
        <div className="mt-4 grid gap-3">
          {notes.map((note) => (
            <article key={note.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald">
                <Check size={14} />
                Anotação salva
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-slate-300">{note.body}</p>
            </article>
          ))}
        </div>
      ) : null}
    </form>
  );
}
