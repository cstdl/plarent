import { describe, expect, it } from "vitest";
import { getMonthCells, getUpcomingMonths, toIsoDate } from "@/lib/calendar";

describe("calendar date utilities", () => {
  it("starts a month beginning on Monday without leading cells", () => {
    const cells = getMonthCells(2024, 0);

    expect(cells[0]).toBe(1);
    expect(cells).toHaveLength(35);
  });

  it("places a month beginning on Sunday in the seventh column", () => {
    const cells = getMonthCells(2024, 8);

    expect(cells.slice(0, 7)).toEqual([null, null, null, null, null, null, 1]);
  });

  it("includes leap day in February", () => {
    const days = getMonthCells(2024, 1).filter((day) => day !== null);

    expect(days).toHaveLength(29);
    expect(days.at(-1)).toBe(29);
  });

  it("continues across a year boundary", () => {
    const months = getUpcomingMonths(new Date(2026, 11, 15));

    expect(months).toHaveLength(12);
    expect(months[0]).toEqual({ year: 2026, month: 11 });
    expect(months.at(-1)).toEqual({ year: 2027, month: 10 });
  });

  it("formats stable ISO date keys", () => {
    expect(toIsoDate(2026, 8, 3)).toBe("2026-09-03");
  });
});
