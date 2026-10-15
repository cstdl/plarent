export type CalendarMonth = {
  year: number;
  month: number;
};

export function getUpcomingMonths(today: Date, count = 12): CalendarMonth[] {
  return Array.from({ length: Math.max(0, count) }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() + index, 1);

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });
}

export function getMonthCells(year: number, month: number): (number | null)[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const trailingCells = (7 - (cells.length % 7)) % 7;

  return [...cells, ...Array<null>(trailingCells).fill(null)];
}

export function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
