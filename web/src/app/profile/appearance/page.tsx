import { BackLink } from "@/components/back-link";
import { getTranslations } from "@/lib/i18n/server";
import { AppearanceOptions } from "./appearance-options";

export default async function AppearancePage() {
  const t = await getTranslations();

  return (
    <div className="flex w-full flex-col gap-6">
      <BackLink href="/profile" label={t("common.back")} />
      <h1 className="type-headline text-accent">{t("profile.appearance.label")}</h1>
      <AppearanceOptions />
    </div>
  );
}
