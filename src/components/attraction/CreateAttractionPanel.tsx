"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import createAttraction from "@/lib/attraction/createAttraction";
import { Attraction } from "@/interface/Attraction";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

type Day = (typeof DAYS)[number];

const CATEGORIES: Attraction["category"][] = [
  "museum",
  "restaurant",
  "landmark",
  "nature",
  "activity",
  "temple",
  "park",
  "other",
];

type OpeningHourEntry = { open: string; close: string; enabled: boolean };
type OpeningHoursForm = Record<Day, OpeningHourEntry>;

const defaultHours = (): OpeningHoursForm =>
  Object.fromEntries(
    DAYS.map((d) => [d, { open: "09:00", close: "18:00", enabled: false }])
  ) as OpeningHoursForm;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0]";

const labelClass = "text-sm font-medium text-slate-700 dark:text-[#f1eefc]";

export default function CreateAttractionPanel({ hotelId }: { hotelId: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "other" as Attraction["category"],
    street: "",
    district: "",
    province: "",
    postalCode: "",
    img: "",
  });

  const [openingHours, setOpeningHours] = useState<OpeningHoursForm>(defaultHours());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHourChange = (day: Day, field: "open" | "close", value: string) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleHourToggle = (day: Day, enabled: boolean) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled },
    }));
  };

  const handleSubmit = async () => {
    if (!session?.user?.token) return;
    setError(null);
    setIsLoading(true);

    try {
      const hours = Object.fromEntries(
        DAYS.filter((d) => openingHours[d].enabled).map((d) => [
          d,
          { open: openingHours[d].open, close: openingHours[d].close },
        ])
      );

      const payload: Omit<Attraction, "_id" | "createdAt"> = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        address: {
          street: formData.street,
          district: formData.district,
          province: formData.province,
          postalCode: formData.postalCode,
        },
        openingHours: Object.keys(hours).length > 0 ? hours : undefined,
        img: formData.img,
      };

      const result = await createAttraction(payload, session.user.token);

      if (!result.success) {
        setError(result.message ?? "Failed to create attraction.");
        return;
      }

      router.push(`/hotels/${hotelId}/attractions`);
    } catch (err) {
      console.error("Create attraction error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Basic Info */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#30294d] dark:bg-[#25203e]">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-[#f5f3ff]">
          Basic Info
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Name <span className="text-red-500">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Wat Pho" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Category <span className="text-red-500">*</span></label>
            <select name="category" value={formData.category} onChange={handleChange}
              className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Short description of the attraction"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className={labelClass}>Image URL <span className="text-red-500">*</span></label>
            <input name="img" value={formData.img} onChange={handleChange} className={inputClass} placeholder="https://..." />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#30294d] dark:bg-[#25203e]">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-[#f5f3ff]">
          Address
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className={labelClass}>Street</label>
            <input name="street" value={formData.street} onChange={handleChange} className={inputClass} placeholder="123 Example Rd" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>District <span className="text-red-500">*</span></label>
            <input name="district" value={formData.district} onChange={handleChange} className={inputClass} placeholder="District" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Province <span className="text-red-500">*</span></label>
            <input name="province" value={formData.province} onChange={handleChange} className={inputClass} placeholder="Province" />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Postal Code</label>
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} placeholder="10200" />
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#30294d] dark:bg-[#25203e]">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-[#f5f3ff]">
          Opening Hours <span className="text-xs font-normal text-slate-400">(optional)</span>
        </h2>
        <div className="flex flex-col gap-3">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`toggle-${day}`}
                checked={openingHours[day].enabled}
                onChange={(e) => handleHourToggle(day, e.target.checked)}
                className="h-4 w-4 accent-indigo-600"
              />
              <label
                htmlFor={`toggle-${day}`}
                className="w-24 text-sm font-medium capitalize text-slate-700 dark:text-[#f1eefc]"
              >
                {day}
              </label>
              <input
                type="time"
                value={openingHours[day].open}
                disabled={!openingHours[day].enabled}
                onChange={(e) => handleHourChange(day, "open", e.target.value)}
                className={`${inputClass} w-32 disabled:opacity-40`}
              />
              <span className="text-sm text-slate-400">–</span>
              <input
                type="time"
                value={openingHours[day].close}
                disabled={!openingHours[day].enabled}
                onChange={(e) => handleHourChange(day, "close", e.target.value)}
                className={`${inputClass} w-32 disabled:opacity-40`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.back()}
          disabled={isLoading}
          className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-100 disabled:cursor-not-allowed dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b]"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
        >
          {isLoading ? "Creating..." : "Create Attraction"}
        </button>
      </div>
    </div>
  );
}