"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Transportation } from "@/interface/Transportation";
import getTransportation from "@/lib/transportation/getTransportation";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";

export default function TransportationPage() {
  const { data: session } = useSession();
  const { transportationId } = useParams<{ transportationId: string }>();
  const [transportation, setTransportation] = useState<Transportation | null>(null);
  
  useEffect(() => {
    if (!session) return;
    const loadTransportation = async () => {
      const res = await getTransportation(session.user.token, transportationId);
      if (!res.success) {
        console.error("Error while loading transportation:", res.message);
        return;
      }
      setTransportation(res.data);
    };
    loadTransportation();
  }, [session, transportationId]);

  if (!transportation) {
    return (
      <Loading />
    );
  }

  return (
    <main className="flex my-18 px-8 w-6xl max-w-full gap-8 flex-col text-4xl font-bold">
      <h1 className="ml-8">{transportation.name}</h1>
      <div className="relative h-100 rounded-4xl overflow-clip">
        <Image
          src={transportation.img}
          alt={`Banner of transportation ${transportation.name}`}
          sizes="80vw"
          fill
        />
      </div>
      <div className="flex mx-20 justify-between items-start">
        Transportation's Info
      </div>
    </main>
  );
}
