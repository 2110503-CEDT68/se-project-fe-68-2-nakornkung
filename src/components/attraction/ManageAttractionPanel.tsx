"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AttractionCard from "./AttractionCard";
import PaginationControls from "@/components/PaginationControls"; 
import deleteAttraction from "@/lib/attraction/deleteAttraction";
import ManageAttractionCard from "./Manage AttractionCard";

type ManageAttractionPanelProps = {
  items: any[];
  hotelId: string;
  onUpdate?: () => Promise<void>;
};

export default function ManageAttractionPanel({ items: initialItems, hotelId, onUpdate }: ManageAttractionPanelProps) {
  const [items, setItems] = useState(initialItems);
  const { data: session } = useSession();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const total = items.length;
  const pages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;

  const paginatedItems = items.slice(startIndex, startIndex + limit);

  const handleSave = async (attractionId: string, updatedData: any) => {
    if (!session?.user?.token) return;
    try {
      setItems((current) =>
        current.map((item) =>
          item.id === attractionId ? { ...item, ...updatedData } : item
        )
      );
      if (onUpdate) await onUpdate();
    } catch (error) {
      console.error("Error updating attraction:", error);
    }
  };

const handleDelete = async (attractionId: string) => {
  if (!session?.user?.token) return;

  try {
    const res = await deleteAttraction(attractionId, session.user.token);

    if (!res.success) {
      console.error("Error deleting attraction:", res.message);
      return;
    }

    setItems((current) => current.filter((item) => item.id !== attractionId));

    if (onUpdate) await onUpdate();
  } catch (error) {
    console.error("Error deleting attraction:", error);
  }
};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center mb-4 gap-4 w-full">
        <Link 
          href={`/hotels/${hotelId}/attractions/new`}
          className="px-6 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-primary shadow hover:opacity-90 transition font-medium text-slate-800 dark:text-slate-200"
        >
          Create Attraction
        </Link>
        
        {items.length > 0 && (
          <PaginationControls 
            pages={pages} 
            currentPage={page} 
            limit={limit} 
            setPage={setPage} 
            setLimit={setLimit} 
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        {paginatedItems.map((attraction) => (
          <ManageAttractionCard 
            key={attraction.id} 
            attraction={attraction} 
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}

        {items.length === 0 && (
          <p className="rounded-lg bg-white dark:bg-[#25203e] p-6 text-center text-slate-600 dark:text-[#ddd8f1] shadow">
            No attractions found.
          </p>
        )}
      </div>
    </div>
  );
}