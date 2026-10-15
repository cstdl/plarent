"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/lib/i18n";

// Preview only: the API cannot store plant images yet, so the file input has no name and is not submitted.
export function ImagePicker() {
  const t = useTranslations();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <label className="flex size-[95px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-secondary focus-within:ring-2 focus-within:ring-secondary-title">
      {previewUrl ? (
        <img src={previewUrl} alt="" className="size-full object-cover" />
      ) : (
        <span className="type-small text-center text-secondary">{t("plants.new.addImage")}</span>
      )}
      <input
        type="file"
        accept="image/*"
        aria-label={t("plants.new.addImage")}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
        }}
      />
    </label>
  );
}
