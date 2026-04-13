"use client";
import Image from "next/image";
import { Transportation } from "@/interface/Transportation";
import capitalize from "@/util/capitalize";

interface TransportCardProps {
  transport: Transportation;
  onDelete: (id: string) => void
}

export default function TransportCard({ transport, onDelete }: TransportCardProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this transportation?")) return;
    onDelete(transport._id);
  };

  return (
    <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none md:grid-cols-[170px_minmax(0,1fr)_auto] md:items-center">
      <div className="w-50 h-30 relative overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image
          src={transport.img}
          alt={transport.name}
          fill
          sizes="(max-width: 768px) 100vw, 170px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 space-y-1 ml-15 ">
        <h2 className="text-lg font-bold text-slate-900 dark:text-[#f5f3ff]">{transport.name} by {transport.providerName}</h2>
        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          {transport.description}
        </p>

        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">type : </span>
          {capitalize(transport.type)}
        </p>

        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">price : </span>
          {transport.price}฿
        </p>

        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">pick up : </span>
          {transport.pickUpArea.name} ({transport.pickUpArea.address.street}, {transport.pickUpArea.address.district}, {transport.pickUpArea.address.province} {transport.pickUpArea.address.postalCode})
        </p>

        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">drop off : </span>
          {transport.dropOffArea.name} ({transport.dropOffArea.address.street}, {transport.dropOffArea.address.district}, {transport.dropOffArea.address.province} {transport.dropOffArea.address.postalCode})
        </p>
      </div>

      <div className="flex items-end justify-end gap-3 self-end">
        <button
          onClick={handleDelete}
          className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f]  dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
