import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, NotebookPen, Play } from "lucide-react";
import { EditableReferences } from "@/components/EditableReferences";
import { Panel } from "@/components/Panel";
import { Shell } from "@/components/Shell";
import { TopicCompletion } from "@/components/TopicCompletion";
import { TopicNotes } from "@/components/TopicNotes";
import { getUnitById } from "@/lib/academy";

export const dynamic = "force-dynamic";

function topicStatus(status: string): "not_started" | "in_progress" | "completed" {
  if (status === "IN_PROGRESS") return "in_progress";
  if (status === "COMPLETED") return "completed";
  return "not_started";
}

function youtubeVideoId(url?: string | null) {
  if (!url) return null;

  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

export default async function UnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = await getUnitById(id);
  if (!unit) notFound();
  const videoMaterial = unit.materials.find((material) => youtubeVideoId(material.url));
  const videoId = youtubeVideoId(videoMaterial?.url);

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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{unit.discipline.title}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold text-white">{unit.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{unit.objective}</p>
          </div>

          <aside className="premium-border rounded-lg bg-panel/80 p-5">
            <p className="text-sm text-slate-400">Mastery Level</p>
            <p className="mt-2 text-2xl font-semibold text-white">Level {unit.masteryLevel}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{unit.masteryDescription}</p>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {videoMaterial && videoId ? (
              <Panel title="Vídeo da aula" icon={<Play size={20} />}>
                <a
                  href={videoMaterial.url ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-lg border border-white/10 bg-black"
                >
                  <div className="relative aspect-video">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={videoMaterial.title}
                      className="h-full w-full object-cover opacity-80 transition group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 grid place-items-center bg-black/30">
                      <span className="inline-flex size-16 items-center justify-center rounded-full bg-cyan text-graphite shadow-glow transition group-hover:bg-white">
                        <Play size={28} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                </a>
                <p className="mt-3 text-sm leading-6 text-slate-400">{videoMaterial?.description}</p>
                <a
                  href={videoMaterial.url ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-graphite transition hover:bg-white"
                >
                  Assistir no YouTube
                  <ExternalLink size={16} />
                </a>
              </Panel>
            ) : null}

            <TopicNotes
              topicTitle={unit.title}
              unitId={unit.id}
              initialNotes={unit.notes.map((note) => ({
                id: note.id,
                title: note.title,
                body: note.body,
                createdAt: note.createdAt
              }))}
            />

            <Panel title="Materiais de referência" icon={<NotebookPen size={20} />}>
              <EditableReferences
                initialReferences={unit.materials.map((material) => ({
                  title: material.title,
                  description: material.description,
                  url: material.url ?? undefined
                }))}
                topicTitle={unit.title}
                disciplineTitle={unit.discipline.title}
              />
            </Panel>
          </div>

          <div className="space-y-6">
            <TopicCompletion
              topicTitle={unit.title}
              disciplineTitle={unit.discipline.title}
              unitId={unit.id}
              initialStatus={topicStatus(unit.status)}
            />
          </div>
        </section>
      </main>
    </Shell>
  );
}
