import { notFound } from "next/navigation";
import { getPlant } from "@/lib/api";
import { t } from "@/lib/i18n";
import { BackLink, PlantForm } from "../plant-form";
import { updatePlantAction } from "./actions";
import { DeletePlantButton } from "./delete-plant-button";

export default async function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plant = await getPlant(id);

  if (!plant) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-content">
      <div className="flex items-center justify-between">
        <BackLink href="/plants" />
        <DeletePlantButton plantId={plant.id} plantName={plant.name} />
      </div>

      <h1 className="type-title text-primary">{t("plants.edit.title")}</h1>
      <p className="type-body text-primary">{t("plants.edit.intro", { name: plant.name })}</p>

      <PlantForm action={updatePlantAction.bind(null, plant.id)} plant={plant} />
    </div>
  );
}
