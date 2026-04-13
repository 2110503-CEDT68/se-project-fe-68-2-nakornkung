"use client";

import provinces from "@/data/provinces";

interface HotelSearchProps {
  name: string;
  province: string;
  setName: (name: string) => void;
  setProvince: (province: string) => void;
  onSearch?: () => void;
  automatic?: boolean;
}

export default function HotelSearch({ name, province, setName, setProvince, onSearch, automatic }: HotelSearchProps) {
  return (
    <div className="flex p-4 gap-4 justify-between rounded-3xl bg-secondary dark:bg-dark-secondary">
      <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
        <input
          className="w-full rounded-r-lg rounded-l-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 placeholder:text-slate-400 placeholder:italic focus:border-indigo-500 focus:bg-white focus:outline-none
          dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary"
          placeholder="Hotel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className={`w-full rounded-r-2xl rounded-l-lg border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 focus:border-indigo-500
          dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary
          focus:bg-white focus:outline-none ${province ? "text-slate-700" : "text-slate-400 italic"}`}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option label="Any province" />

          {provinces.map((province) => (<option key={province}>{province}</option>))}
        </select>

      </div>
      {!automatic && (
        <button
          className="rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-accent 
          dark:bg-secondary-gray dark:text-dark-primary dark:hover:bg-secondary-purple disabled:bg-gray-400"
          onClick={onSearch}
        >
          Find
        </button>
      )}
    </div>
  );
}
