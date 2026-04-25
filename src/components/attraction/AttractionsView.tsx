"use client";

import Link from "next/link";
import AttractionCard from "./AttractionCard";
import { attractions } from "./MockUpAttraction";

interface AttractionsViewProps {
  hotelId: string;
  isAdmin?: boolean;
}

export default function AttractionsView({ hotelId, isAdmin }: AttractionsViewProps) {
  return (
    <main className="flex my-8 px-10 w-full xl:w-7/8 gap-8 flex-col items-center">
      <div className="flex gap-8 w-full max-w-7xl flex-col">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-text-2 dark:text-text-4">
              Nearby Attractions
            </h2>
            <p className="text-lg font-medium text-text-3 dark:text-text-3">
              {attractions.length} spots
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

      </div>

      {isAdmin && (
        <div className="flex justify-center mx-20">
          <Link
            className="px-6 py-2 self-center rounded-2xl bg-accent text-white text-xl font-bold dark:bg-dark-primary dark:hover:bg-dark-primary-0"
            href={`/hotels/${hotelId}/attractions`}
          >
            Manage Attractions
          </Link>
        </div>
      )}
    </main>
  );
}