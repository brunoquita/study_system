import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, NotebookPen } from "lucide-react";
import { EditableReferences } from "@/components/EditableReferences";
import { Panel } from "@/components/Panel";
import { Shell } from "@/components/Shell";
import { TopicCompletion } from "@/components/TopicCompletion";
import { TopicNotes } from "@/components/TopicNotes";
import { adjacentTopics, findTopic } from "@/lib/curriculum";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = findTopic(slug);
  if (!topic) notFound();

  const navigation = adjacentTopics(slug);

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/modulos/${topic.module.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            {topic.module.title}
          </Link>

          <div className="flex flex-col gap-2 sm:flex-row">
            {navigation.previous ? (
              <Link
                href={`/topicos/${navigation.previous.slug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan/50 hover:text-white"
              >
                <ArrowLeft size={16} />
                Anterior
              </Link>
            ) : (
              <span className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 text-sm font-semibold text-slate-600">
                <ArrowLeft size={16} />
                Anterior
              </span>
            )}

            {navigation.next ? (
              <Link
                href={`/topicos/${navigation.next.slug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan/45 bg-cyan/10 px-4 text-sm font-semibold text-cyan transition hover:bg-cyan hover:text-black"
              >
                Próximo tópico
                <ArrowRight size={16} />
              </Link>
            ) : (
              <span className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 text-sm font-semibold text-slate-600">
                Último tópico
                <ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{topic.discipline.title}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold text-white">{topic.unit}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Understand {topic.unit}, practice it deliberately, and explain how it applies inside {topic.discipline.title}.
            </p>
          </div>
          <aside className="premium-border rounded-lg bg-panel/78 p-5">
            <p className="text-sm text-slate-400">Mastery Level</p>
            <p className="mt-2 text-2xl font-semibold text-white">{topic.unit === "Arrays" ? "Level 2" : "Level 1"}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {topic.unit === "Arrays" ? "I can use it" : "I know the topic"}
            </p>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <TopicNotes topicTitle={topic.unit} />

            <Panel title="Materiais de referência" icon={<NotebookPen size={20} />}>
              <EditableReferences
                initialReferences={topic.discipline.references}
                topicTitle={topic.unit}
                disciplineTitle={topic.discipline.title}
              />
            </Panel>

          </div>

          <div className="space-y-6">
            <TopicCompletion
              topicTitle={topic.unit}
              disciplineTitle={topic.discipline.title}
              initialStatus="not_started"
            />
          </div>
        </section>
      </main>
    </Shell>
  );
}
