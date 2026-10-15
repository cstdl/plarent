import { describe, expect, it } from "vitest";
import { createTranslator } from "@/lib/i18n";

describe("createTranslator", () => {
  it("uses the requested locale", () => {
    expect(createTranslator("de")("profile.language.label")).toBe("Sprache");
    expect(createTranslator("en")("profile.language.label")).toBe("Language");
  });

  it("interpolates params", () => {
    expect(createTranslator("de")("home.greeting", { name: "Ada" })).toBe("Guten Morgen, Ada!");
  });
});
