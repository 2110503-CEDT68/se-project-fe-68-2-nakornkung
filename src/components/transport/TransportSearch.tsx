"use client";

import provinces from "@/data/provinces";
import { TransportationType } from "@/interface/Transportation";
import capitalize from "@/util/capitalize";

const transportationTypes: TransportationType[] = ["car", "airplane", "boat", "bus", "van", "shuttle"];

interface TransportSearchProps {
  name: string;
  provider: string;
  type: TransportationType | "";
  province: string;
  setName: (name: string) => void;
  setProvider: (provider: string) => void;
  setType: (type: TransportationType | "") => void;
  setProvince: (province: string) => void;
}

export default function TransportSearch({ name, provider, type, province, setName, setProvider, setType, setProvince }: TransportSearchProps) {
  return (
    <div className="flex p-4 gap-4 justify-between rounded-3xl bg-secondary dark:bg-dark-secondary">
      <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
        <input
          className="w-full rounded-l-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 placeholder:text-slate-400 placeholder:italic focus:border-indigo-500 focus:bg-white focus:outline-none
          dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary"
          placeholder="Transport Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded-r-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 placeholder:text-slate-400 placeholder:italic focus:border-indigo-500 focus:bg-white focus:outline-none
          dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary"
          placeholder="Provider Name"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />

        <select
          className={`w-full rounded-l-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 focus:border-indigo-500
          dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary
          focus:bg-white focus:outline-none ${type ? "text-slate-700" : "text-slate-400 italic"}`}
          value={type}
          onChange={(e) => setType(e.target.value as TransportationType | "")}
        >
          <option label="Any type" />

          {transportationTypes.map((type) => (<option key={type} value={type}>{capitalize(type)}</option>))}
        </select>

        <select
          className={`w-full rounded-r-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 focus:border-indigo-500
          dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary
          focus:bg-white focus:outline-none ${province ? "text-slate-700" : "text-slate-400 italic"}`}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option label="Any province" />

          {provinces.map((province) => (<option key={province}>{province}</option>))}
        </select>

      </div>
    </div>
  );
}
