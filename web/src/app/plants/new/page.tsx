import { getTranslations } from "@/lib/i18n/server";
import { BackLink, PlantForm } from "../plant-form";
import { createPlantAction } from "./actions";

export default async function NewPlantPage() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-content">
      <BackLink href="/plants" />

      <h1 className="type-title text-primary">{t("plants.new.title")}</h1>
      <p className="type-body text-primary">{t("plants.new.intro")}</p>

      <PlantForm action={createPlantAction} />
    </div>
  );
}
