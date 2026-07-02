export function Panel({
  title,
  icon,
  children
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="premium-border rounded-lg bg-panel/78 p-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-white/8 text-cyan">{icon}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}
