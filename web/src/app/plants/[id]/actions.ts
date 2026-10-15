"use server";

import { redirect } from "next/navigation";
import { deletePlant, updatePlant } from "@/lib/api";
import { parsePlantForm } from "../plant-form-data";

export async function updatePlantAction(id: string, formData: FormData): Promise<void> {
  await updatePlant(id, parsePlantForm(formData));
  redirect("/plants");
}

export async function deletePlantAction(id: string): Promise<void> {
  await deletePlant(id);
  redirect("/plants");
}
