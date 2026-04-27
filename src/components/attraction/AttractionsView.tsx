"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AttractionCard from "./AttractionCard";
import getAttractionsByHotel from "@/lib/attraction/getAttractionsByHotel";
import { Attraction } from "@/interface/Attraction";

interface AttractionsViewProps {
  hotelId: string;
  isAdmin?: boolean;
}

export default function AttractionsView({ hotelId, isAdmin }: AttractionsViewProps) {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      setLoading(true);
      setError(null);
      const res = await getAttractionsByHotel(hotelId);
      if (res.success) {
        setAttractions(res.data);
        setTotal(res.total);
      } else {
        setError(res.message ?? "Failed to load attractions");
      }
      setLoading(false);
    };

    fetchAttractions();
  }, [hotelId]);

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
              {loading ? "Loading..." : `${total} spots`}
            </p>
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-slate-100 animate-pulse dark:bg-[#312b50]"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.filter((a) => !!a._id).map((attraction, i) => (
              <AttractionCard key={attraction._id ?? i} attraction={attraction} />
            ))}
          </div>
        )}

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