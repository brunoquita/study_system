import { GraduationCap, LockKeyhole } from "lucide-react";
import { login } from "@/app/login/actions";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-panel/86 p-6 shadow-glow">
        <div className="mb-7 flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-lg bg-white text-graphite">
            <GraduationCap size={25} />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-white">Sistema Acadêmico</h1>
            <p className="text-sm text-slate-400">Acesso pessoal Bruno Rocha</p>
          </div>
        </div>

        <form action={login} className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Usuário
            <input
              name="username"
              autoComplete="username"
              defaultValue="bruno.rocha"
              className="h-12 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Senha
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-12 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan"
            />
          </label>

          {params.error ? (
            <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              Usuário ou senha inválidos.
            </p>
          ) : null}

          <button className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-graphite transition hover:bg-white">
            <LockKeyhole size={17} />
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}
