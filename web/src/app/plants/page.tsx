import Link from "next/link";
import { getPlants } from "@/lib/api";
import { t } from "@/lib/i18n";
import { PlantCard } from "./plant-card";

export default async function PlantsPage() {
  const plants = await getPlants();

  return (
    <div className="flex w-full flex-col gap-content">
      <div className="flex items-center justify-between gap-4">
        <h1 className="type-headline text-accent">{t("plants.list.title")}</h1>
        {plants.length > 0 && (
          <Link
            href="/plants/new"
            aria-label={t("plants.list.addPlant")}
            className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-boxes-primary text-primary shadow-[0_5px_16px_rgba(53,66,56,0.07)] hover:opacity-90"
          >
            <PlusIcon />
          </Link>
        )}
      </div>

      {plants.length === 0 && (
        <>
          <p className="type-body text-primary">{t("plants.list.intro")}</p>
          <Link
            href="/plants/new"
            className="flex h-[61px] items-center gap-[10px] rounded-[20px] bg-boxes-primary px-[14px] font-sans text-base font-semibold text-primary shadow-[0_5px_16px_rgba(53,66,56,0.07)] hover:opacity-90"
          >
            <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-beige text-dark-brown">
              <PlusIcon />
            </span>
            {t("plants.list.addPlant")}
          </Link>
        </>
      )}

      {plants.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {plants.map((plant) => (
            <li key={plant.id}>
              <PlantCard plant={plant} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 1v18M1 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
