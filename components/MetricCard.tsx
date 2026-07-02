import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  icon: Icon,
  tone = "cyan"
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "cyan" | "violet" | "emerald" | "amber";
}) {
  const tones = {
    cyan: "bg-cyan/10 text-cyan",
    violet: "bg-violet/10 text-violet",
    emerald: "bg-emerald/10 text-emerald",
    amber: "bg-amber/10 text-amber"
  };

  return (
    <div className="premium-border rounded-lg bg-panel/80 p-4 shadow-glow">
      <div className={`mb-5 flex size-10 items-center justify-center rounded-lg ${tones[tone]}`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
