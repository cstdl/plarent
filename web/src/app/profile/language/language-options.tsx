"use client";

import { useTransition } from "react";
import { LOCALE_FLAGS } from "@/components/flags";
import { type Locale, LOCALES, useTranslations } from "@/lib/i18n";
import { setLocaleAction } from "../actions";

export function LanguageOptions({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-4">
      {LOCALES.map((option) => {
        const selected = option === locale;
        const Flag = LOCALE_FLAGS[option];
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            disabled={isPending}
            onClick={() => {
              if (!selected) {
                startTransition(() => setLocaleAction(option));
              }
            }}
            className={`flex w-full items-center gap-4 rounded-[16px] px-5 py-3 text-left shadow-[0_5px_16px_rgba(53,66,56,0.07)] disabled:opacity-60 ${
              selected ? "bg-boxes-primary" : "bg-boxes-secondary"
            }`}
          >
            <Flag className="size-8 shrink-0" />
            <span className="font-display text-xl font-semibold text-primary">
              {t(`profile.language.${option}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
