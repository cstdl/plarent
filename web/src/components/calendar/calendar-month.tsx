import { TaskDots, type TaskCounts } from "@/components/calendar/task-dots";
import { WeekdayHeader } from "@/components/calendar/weekday-header";
import { getMonthCells, toIsoDate } from "@/lib/calendar";
import { locale } from "@/lib/i18n";

type CalendarMonthProps = {
  year: number;
  month: number;
  taskCountsByDate?: Readonly<Record<string, TaskCounts>>;
};

export function CalendarMonth({
  year,
  month,
  taskCountsByDate = {},
}: CalendarMonthProps) {
  const monthId = `month-${year}-${month + 1}`;
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  return (
    <section
      aria-labelledby={monthId}
      style={{ contentVisibility: "auto", containIntrinsicSize: "350px" }}
    >
      <h2 id={monthId} className="type-body mb-2 font-bold">
        {monthLabel}
      </h2>
      <WeekdayHeader />
      <div className="grid grid-cols-7">
        {getMonthCells(year, month).map((day, index) => {
          const date = day === null ? null : toIsoDate(year, month, day);
          const counts = date ? taskCountsByDate[date] : undefined;

          return (
            <div
              key={`${year}-${month}-${index}`}
              className="flex min-h-14 flex-col items-center py-3"
            >
              {date && day !== null ? (
                <>
                  <time dateTime={date} className="type-body leading-none">
                    {day}
                  </time>
                  <div className="mt-2">
                    <TaskDots counts={counts ?? { overdue: 0, open: 0 }} />
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
