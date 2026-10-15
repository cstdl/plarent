import { getLocale, getTranslations } from "@/lib/i18n/server";
import { LanguageSelect } from "./language-select";

export default async function ProfilePage() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <div className="rounded-[14px] border border-secondary/30 bg-boxes-secondary p-6 shadow-[0_5px_16px_rgba(53,66,56,0.07)]">
      <h1 className="type-title text-primary">{t("profile.title")}</h1>

      <div className="mt-6">
        <LanguageSelect locale={locale} />
      </div>
    </div>
  );
}
