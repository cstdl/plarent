import { connection } from "next/server";
import { CalendarMonth } from "@/components/calendar/calendar-month";
import { getUpcomingMonths } from "@/lib/calendar";
import { getLocale, getTranslations } from "@/lib/i18n/server";

export default async function CalendarPage() {
  await connection();
  const locale = await getLocale();
  const t = await getTranslations();

  const months = getUpcomingMonths(new Date());

  return (
    <div className="flex flex-col">
      <h1 className="type-headline mb-6 text-accent">{t("calendar.title")}</h1>
      <div className="flex flex-col gap-8">
        {months.map(({ year, month }) => (
          <CalendarMonth key={`${year}-${month}`} year={year} month={month} locale={locale} />
        ))}
      </div>
    </div>
  );
}
