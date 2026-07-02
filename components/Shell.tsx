import Link from "next/link";
import { BookOpen, GraduationCap, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { logout } from "@/app/login/actions";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-graphite/86 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-white text-graphite">
              <GraduationCap size={22} />
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-sm font-semibold tracking-wide text-white">
                Sistema Acadêmico
              </strong>
              <span className="block truncate text-xs text-slate-400">Bruno Rocha</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white" href="/" title="Dashboard">
              <LayoutDashboard size={20} />
            </Link>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg px-2.5 text-slate-300 hover:bg-white/10 hover:text-white"
              href="/#disciplinas"
              title="Matérias"
            >
              <BookOpen size={20} />
              <span className="hidden text-sm font-medium md:inline">Matérias</span>
            </Link>
            <span className="hidden items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-medium text-cyan sm:flex">
              <Sparkles size={14} />
              V1 pessoal
            </span>
            <form action={logout}>
              <button
                className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </form>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
