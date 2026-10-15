"use server";

import { redirect } from "next/navigation";
import { createPlant } from "@/lib/api";
import { parsePlantForm } from "../plant-form-data";

export async function createPlantAction(formData: FormData): Promise<void> {
  const plant = await createPlant(parsePlantForm(formData));

  redirect(`/plants/${plant.id}`);
}
