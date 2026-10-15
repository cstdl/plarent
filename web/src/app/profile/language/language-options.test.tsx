import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { LanguageOptions } from "./language-options";

const setLocaleAction = vi.fn();

vi.mock("../actions", () => ({
  setLocaleAction: (locale: string) => setLocaleAction(locale),
}));

describe("LanguageOptions", () => {
  afterEach(() => {
    cleanup();
    setLocaleAction.mockReset();
  });

  it("renders a card per language and marks the current one as selected", () => {
    render(
      <LocaleProvider locale="de">
        <LanguageOptions locale="de" />
      </LocaleProvider>,
    );

    expect(screen.getByRole("button", { name: "Englisch" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Deutsch" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Deutsch" })).toHaveClass("bg-boxes-primary");
  });

  it("switches the locale when another language is chosen", () => {
    render(
      <LocaleProvider locale="de">
        <LanguageOptions locale="de" />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Englisch" }));

    expect(setLocaleAction).toHaveBeenCalledWith("en");
  });

  it("does nothing when the current language is chosen again", () => {
    render(
      <LocaleProvider locale="de">
        <LanguageOptions locale="de" />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Deutsch" }));

    expect(setLocaleAction).not.toHaveBeenCalled();
  });
});
