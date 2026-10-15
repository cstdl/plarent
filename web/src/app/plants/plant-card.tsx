import Link from "next/link";
import type { Plant } from "@/lib/types";

export function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      href={`/plants/${plant.id}`}
      className="flex items-center gap-4 rounded-[20px] bg-boxes-secondary p-[14px] shadow-[0_5px_16px_rgba(53,66,56,0.07)] hover:opacity-90"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[14px]">
        <div>
          <p className="truncate font-display text-[2rem] font-semibold leading-tight text-primary">{plant.name}</p>
          <p className="type-small text-primary">{plant.species}</p>
        </div>
        {plant.location && <p className="type-body font-bold text-primary">{plant.location}</p>}
        {/* The care intervals (watering, misting) should be shown here once the API stores them. */}
      </div>

      {/* Placeholder until the API can store plant photos. */}
      <div className="mr-[10px] flex size-[100px] shrink-0 items-center justify-center rounded-full bg-beige">
        <img src="/home/day-plant.svg" alt="" width={36} height={52} />
      </div>
    </Link>
  );
}
