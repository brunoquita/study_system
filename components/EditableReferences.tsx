"use client";

import { useState } from "react";
import { Pencil, Plus, Save, X } from "lucide-react";

type EditableReference = {
  title: string;
  description: string;
};

type InitialReference = string | EditableReference;

export function EditableReferences({
  initialReferences,
  topicTitle,
  disciplineTitle
}: {
  initialReferences: InitialReference[];
  topicTitle: string;
  disciplineTitle: string;
}) {
  const [editing, setEditing] = useState(false);
  const [references, setReferences] = useState<EditableReference[]>(
    initialReferences.map((reference) =>
      typeof reference === "string"
        ? {
            title: reference,
            description: `Use como referência para estudar ${topicTitle} dentro de ${disciplineTitle}.`
          }
        : reference
    )
  );
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");

  function updateReference(index: number, field: keyof EditableReference, value: string) {
    setReferences((current) =>
      current.map((reference, currentIndex) =>
        currentIndex === index ? { ...reference, [field]: value } : reference
      )
    );
  }

  function removeReference(index: number) {
    setReferences((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function addReference() {
    const title = draftTitle.trim();
    const description = draftDescription.trim();
    if (!title) return;

    setReferences((current) => [...current, { title, description }]);
    setDraftTitle("");
    setDraftDescription("");
  }

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="grid gap-3">
          {references.map((reference, index) => (
            <div key={`${reference.title}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="flex flex-col gap-2 lg:flex-row">
                <input
                  value={reference.title}
                  onChange={(event) => updateReference(index, "title", event.target.value)}
                  placeholder="Título do material"
                  className="min-h-11 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan"
                  aria-label={`Título do material ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-slate-300 transition hover:border-red-400/50 hover:text-red-200"
                >
                  <X size={16} />
                  Remover
                </button>
              </div>
              <textarea
                value={reference.description}
                onChange={(event) => updateReference(index, "description", event.target.value)}
                rows={3}
                placeholder="Descrição, link, observações ou como usar este material..."
                className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
                aria-label={`Descrição do material ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-cyan/20 bg-cyan/[0.03] p-3">
          <p className="mb-3 text-sm font-semibold text-cyan">Adicionar material</p>
          <div className="grid gap-2">
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="Título do material"
              className="min-h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan"
            />
            <textarea
              value={draftDescription}
              onChange={(event) => setDraftDescription(event.target.value)}
              rows={3}
              placeholder="Descrição, link, objetivo ou observações..."
              className="resize-y rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addReference}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan/45 bg-cyan/10 px-4 text-sm font-semibold text-cyan transition hover:bg-cyan hover:text-black"
              >
                <Plus size={16} />
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            Edição da sessão atual. Com o banco conectado, isso pode virar material persistido.
          </p>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-graphite transition hover:bg-white"
          >
            <Save size={16} />
            Salvar lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {references.map((reference) => (
          <div key={reference.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="font-semibold text-white">{reference.title}</p>
            {reference.description ? (
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{reference.description}</p>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setEditing(true)}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan/50 hover:text-white"
      >
        <Pencil size={16} />
        Editar materiais
      </button>
    </div>
  );
}
