import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { AppearanceOptions } from "./appearance-options";

function renderOptions() {
  render(
    <LocaleProvider locale="de">
      <AppearanceOptions />
    </LocaleProvider>,
  );
}

describe("AppearanceOptions", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    });
  });

  afterEach(() => {
    cleanup();
    document.documentElement.classList.remove("dark");
    vi.unstubAllGlobals();
  });

  it("marks the light theme as selected by default", () => {
    renderOptions();

    expect(screen.getByRole("button", { name: "Hell" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Hell" })).toHaveClass("bg-boxes-primary");
    expect(screen.getByRole("button", { name: "Dunkel" })).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to the dark theme and persists it", () => {
    renderOptions();

    fireEvent.click(screen.getByRole("button", { name: "Dunkel" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Dunkel" })).toHaveAttribute("aria-pressed", "true");
  });
});
