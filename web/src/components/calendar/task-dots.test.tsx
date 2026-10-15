import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TaskDots } from "@/components/calendar/task-dots";

afterEach(cleanup);

function visibleDots(container: HTMLElement) {
  return container.querySelectorAll(".rounded-full");
}

describe("TaskDots", () => {
  it("renders no dots when there are no tasks", () => {
    const { container } = render(<TaskDots counts={{ overdue: 0, open: 0 }} />);

    expect(visibleDots(container)).toHaveLength(0);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders one dot per task below the limit", () => {
    const { container } = render(<TaskDots counts={{ overdue: 1, open: 1 }} />);

    expect(visibleDots(container)).toHaveLength(2);
    expect(screen.getByRole("img", { name: "2 Aufgaben" })).toBeInTheDocument();
  });

  it("renders at most three dots while announcing the full count", () => {
    const { container } = render(<TaskDots counts={{ overdue: 2, open: 5 }} />);

    expect(visibleDots(container)).toHaveLength(3);
    expect(screen.getByRole("img", { name: "7 Aufgaben" })).toBeInTheDocument();
  });
});
