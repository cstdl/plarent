import { t } from "@/lib/i18n";

export type TaskCounts = {
  overdue: number;
  open: number;
};

type TaskDotsProps = {
  counts: TaskCounts;
};

const MAX_DOTS = 3;

export function TaskDots({ counts }: TaskDotsProps) {
  const overdueCount = Math.max(0, counts.overdue);
  const openCount = Math.max(0, counts.open);
  const total = overdueCount + openCount;
  const visibleOverdue = Math.min(overdueCount, MAX_DOTS);
  const visibleOpen = Math.min(openCount, MAX_DOTS - visibleOverdue);

  if (total === 0) {
    return <span className="block h-1.5" />;
  }

  return (
    <span
      role="img"
      aria-label={t(total === 1 ? "calendar.taskSingular" : "calendar.taskPlural", {
        count: total,
      })}
      className="flex h-1.5 items-center justify-center gap-1"
    >
      <span aria-hidden="true" className="contents">
        {Array.from({ length: visibleOverdue }, (_, index) => (
          <span key={`overdue-${index}`} className="size-1.5 rounded-full bg-task-overdue" />
        ))}
        {Array.from({ length: visibleOpen }, (_, index) => (
          <span key={`open-${index}`} className="size-1.5 rounded-full bg-task-new" />
        ))}
      </span>
    </span>
  );
}
