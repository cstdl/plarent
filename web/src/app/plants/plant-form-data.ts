import type { PlantInput } from "@/lib/types";

export function parsePlantForm(formData: FormData): PlantInput {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Name is required");
  }

  const species = String(formData.get("species") ?? "").trim();
  if (!species) {
    throw new Error("Species is required");
  }

  // Fields the form does not render stay undefined, so an update leaves them unchanged.
  // A field left empty is sent as "", which the API stores as null.
  const optional = (field: string): string | undefined => {
    const value = formData.get(field);
    return value === null ? undefined : String(value).trim();
  };

  return {
    name,
    species,
    location: optional("location"),
    acquiredDate: optional("acquiredDate"),
    notes: optional("notes"),
  };
}
