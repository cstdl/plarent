"use client";

import { MoonIcon, setTheme, SunIcon, type Theme, useTheme } from "@/components/theme";
import { useTranslations } from "@/lib/i18n";

const OPTIONS: { theme: Theme; Icon: typeof SunIcon }[] = [
  { theme: "light", Icon: SunIcon },
  { theme: "dark", Icon: MoonIcon },
];

export function AppearanceOptions() {
  const t = useTranslations();
  const current = useTheme();

  return (
    <div className="flex flex-col gap-4">
      {OPTIONS.map(({ theme, Icon }) => {
        const selected = theme === current;
        return (
          <button
            key={theme}
            type="button"
            aria-pressed={selected}
            onClick={() => setTheme(theme)}
            className={`flex w-full items-center gap-4 rounded-[16px] px-5 py-3 text-left text-primary shadow-[0_5px_16px_rgba(53,66,56,0.07)] ${
              selected ? "bg-boxes-primary" : "bg-boxes-secondary"
            }`}
          >
            <Icon className="size-5 shrink-0" />
            <span className="font-display text-xl font-semibold">
              {t(`profile.appearance.${theme}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
