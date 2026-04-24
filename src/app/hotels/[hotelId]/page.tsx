"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Hotel from "@/interface/Hotel";
import getHotel from "@/lib/hotels/getHotel";
import Loading from "@/components/Loading";
import NearbyAttractionsViwe from "@/components/hotels/NearbyAttractionsViwe";
import { useSession } from "next-auth/react";

export default function HotelPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    const loadHotel = async () => {
      const res = await getHotel(hotelId);
      if (!res.success) {
        console.error("Error while loading hotel:", res.message);
        return;
      }
      setHotel(res.data);
    };
    loadHotel();
  }, [hotelId]);

  if (!hotel) {
    return (
      <Loading />
    );
  }

  return (
    <main className="flex my-18 px-8 w-6xl max-w-full gap-8 flex-col text-4xl font-bold">
      <h1 className="ml-8">{hotel.name}</h1>
      <div className="relative h-100 rounded-4xl overflow-clip">
        <Image
          src={hotel.img}
          alt={`Banner of hotel ${hotel.name}`}
          sizes="80vw"
          fill
        />
      </div>
      <div className="flex mx-20 justify-between items-start">
        <div className="flex gap-30">
          <div className="flex gap-2 flex-col">
            <h2 className="text-2xl font-semibold">Address</h2>
            <p className="text-xl font-normal">{hotel.address}, {hotel.district}, {hotel.province} {hotel.postalcode}</p>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-2xl font-semibold">Tel.</h2>
            <p className="text-xl font-medium">{hotel.tel}</p>
          </div>
        </div>
        <Link
          className="px-6 py-2 self-center rounded-2xl bg-accent text-white text-xl font-bold dark:bg-dark-primary dark:hover:bg-dark-primary-0"
          href={`/book?hotel=${hotel._id}`}
        >
          Book
        </Link>
      </div>
      <NearbyAttractionsViwe />
      {isAdmin && (
        <div className="flex justify-center mx-20">
          <Link
            className="px-6 py-2 rounded-2xl bg-amber-500 text-white text-xl font-bold hover:bg-amber-600
            dark:bg-amber-600 dark:text-white dark:hover:bg-amber-700"
            href={`/hotels/${hotel._id}/attractions`}
          >
            Manage Attractions
          </Link>
        </div>
      )}
    </main>
  );
}