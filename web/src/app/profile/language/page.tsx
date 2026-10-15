import { BackLink } from "@/components/back-link";
import { getLocale, getTranslations } from "@/lib/i18n/server";
import { LanguageOptions } from "./language-options";

export default async function LanguagePage() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <div className="flex w-full flex-col gap-6">
      <BackLink href="/profile" label={t("common.back")} />
      <h1 className="type-headline text-accent">{t("profile.language.label")}</h1>
      <LanguageOptions locale={locale} />
    </div>
  );
}
