export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    NOT_STARTED: "Não iniciada",
    IN_PROGRESS: "Em andamento",
    COMPLETED: "Concluída"
  };

  return labels[status] ?? status;
}

export function masteryLevelDescription(level: number) {
  const labels: Record<number, string> = {
    1: "I know the topic",
    2: "I can use it",
    3: "I can explain it",
    4: "I can teach it"
  };

  return labels[level] ?? labels[1];
}

export function masteryLevelLabel(level: number) {
  return `Level ${level}: ${masteryLevelDescription(level)}`;
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}min` : `${hours}h`;
}

export function formatRelativeDate(date?: Date | string | null) {
  if (!date) return "Sem sessões";

  const target = new Date(date);
  const diffMs = Date.now() - target.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "há 1 dia";
  return `há ${diffDays} dias`;
}
