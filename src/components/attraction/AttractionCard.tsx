import { Attraction, OpeningHour } from "@/interface/Attraction";
import Image from "next/image";

type AttractionCardProps = {
  attraction: Attraction;
  distanceKm?: number; // optional, computed outside (e.g. from geolocation)
};

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

function getIsOpen(openingHours?: Attraction["openingHours"]): boolean {
  if (!openingHours) return false;

  const now = new Date();
  const day = DAYS[now.getDay()];
  const hours = openingHours[day] as OpeningHour | undefined;
  if (!hours) return false;

  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  const current = now.getHours() * 60 + now.getMinutes();
  const open = openH * 60 + openM;
  const close = closeH * 60 + closeM;

  return current >= open && current < close;
}

export default function AttractionCard({
  attraction,
  distanceKm,
}: AttractionCardProps) {
  const isOpen = getIsOpen(attraction.openingHours);

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:scale-[1.02] cursor-pointer transition-transform dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none">
      {/* Image */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image
          src={attraction.img}
          alt={`Attraction Image of ${attraction.name}`}
          sizes="(max-width: 768px) 100vw, 300px"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow gap-1">
        {/* Category badge */}
        <span className="w-fit text-xs font-semibold capitalize px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 dark:bg-[#312b50] dark:text-[#c7c2dc]">
          {attraction.category}
        </span>

        <p className="font-bold text-lg text-slate-900 dark:text-[#f5f3ff]">
          {attraction.name}
        </p>

        {/* District / Province */}
        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          {attraction.address.district}, {attraction.address.province}
        </p>

        {/* Footer row */}
        <div className="flex justify-between items-center mt-auto pt-2">
          {distanceKm !== undefined ? (
            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                distance:{" "}
              </span>
              {distanceKm < 1
                ? `${Math.round(distanceKm * 1000)} m`
                : `${distanceKm.toFixed(1)} km`}
            </p>
          ) : (
            <span />
          )}

          <span
            className={`text-sm font-bold ${
              isOpen
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {isOpen ? "● Open" : "● Closed"}
          </span>
        </div>
      </div>
    </div>
  );
}