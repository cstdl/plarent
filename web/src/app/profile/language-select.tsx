"use client";

import { useTransition } from "react";
import { isLocale, type Locale, LOCALES, useTranslations } from "@/lib/i18n";
import { setLocaleAction } from "./actions";

export function LanguageSelect({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <label htmlFor="locale" className="block font-sans text-sm font-medium text-secondary">
        {t("profile.language.label")}
      </label>
      <select
        id="locale"
        name="locale"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const next = event.target.value;
          if (isLocale(next)) {
            startTransition(() => setLocaleAction(next));
          }
        }}
        className="mt-1 block w-full rounded-[14px] border border-secondary/40 bg-background px-3 py-2 font-sans text-primary shadow-sm outline-none focus:border-secondary-title focus:ring-1 focus:ring-secondary-title disabled:opacity-60"
      >
        {LOCALES.map((option) => (
          <option key={option} value={option}>
            {t(`profile.language.${option}`)}
          </option>
        ))}
      </select>
    </div>
  );
}
