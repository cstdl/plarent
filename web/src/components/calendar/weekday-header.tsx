import { type Locale } from "@/lib/i18n";

const MONDAY_UTC = Date.UTC(2026, 0, 5);

function getWeekdays(locale: Locale): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, index) =>
    format.format(new Date(MONDAY_UTC + index * 24 * 60 * 60 * 1000)),
  );
}

export function WeekdayHeader({ locale }: { locale: Locale }) {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-7 border-b border-secondary bg-background py-2"
    >
      {getWeekdays(locale).map((weekday) => (
        <span key={weekday} className="text-center font-serif text-sm font-bold">
          {weekday}
        </span>
      ))}
    </div>
  );
}
