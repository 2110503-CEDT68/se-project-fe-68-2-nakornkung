"use client";

import { useState } from "react";
import NearbyAttractionsCard, { Attraction } from "./NearbyAttractionsCard";

const attractions: Attraction[] = [
  {
    id: 1,
    name: "Golden Gate Park",
    category: "Park",
    distance: "0.3 mi",
    rating: 4.8,
    reviews: 12400,
    openNow: true,
    icon: "🌿",
    tag: "Nature",
    tagColor: "#16a34a",
    tagBg: "#dcfce7",
  },
  {
    id: 2,
    name: "SFMOMA",
    category: "Museum",
    distance: "1.2 mi",
    rating: 4.6,
    reviews: 8900,
    openNow: true,
    icon: "🎨",
    tag: "Art",
    tagColor: "#7c3aed",
    tagBg: "#ede9fe",
  },
  {
    id: 3,
    name: "Fisherman's Wharf",
    category: "Landmark",
    distance: "2.1 mi",
    rating: 4.4,
    reviews: 21000,
    openNow: true,
    icon: "⚓",
    tag: "Historic",
    tagColor: "#b45309",
    tagBg: "#fef3c7",
  },
  {
    id: 4,
    name: "Alcatraz Island",
    category: "Tour",
    distance: "3.5 mi",
    rating: 4.9,
    reviews: 34200,
    openNow: false,
    icon: "🏝️",
    tag: "Must-See",
    tagColor: "#dc2626",
    tagBg: "#fee2e2",
  },
  {
    id: 5,
    name: "Chinatown",
    category: "Neighborhood",
    distance: "0.8 mi",
    rating: 4.5,
    reviews: 9700,
    openNow: true,
    icon: "🏮",
    tag: "Culture",
    tagColor: "#0369a1",
    tagBg: "#e0f2fe",
  },
];

export default function NearbyAttractionsView() {
  return (
    <main className="flex my-8 px-10 w-full xl:w-7/8 gap-8 flex-col items-center">
      <div className="flex gap-8 w-full max-w-300 flex-col">

        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">📍</span>
          <div>
            <h2 className="text-2xl font-bold text-text-2 dark:text-text-4">
              Nearby Attractions
            </h2>
            <p className="text-lg font-medium text-text-3 dark:text-text-3">
              San Francisco, CA · {attractions.length} spots
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((a) => (
            <NearbyAttractionsCard key={a.id} a={a} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button
            className="px-6 py-2 rounded-2xl bg-primary text-white text-xl font-bold hover:bg-accent
            dark:bg-dark-primary dark:text-white dark:hover:bg-dark-secondary-0 dark:border dark:border-dark-secondary dark:hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
          >
            View All on Map
          </button>
        </div>

      </div>
    </main>
  );
}