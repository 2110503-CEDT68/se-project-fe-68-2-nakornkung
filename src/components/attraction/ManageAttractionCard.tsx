"use client";

import { useEffect, useState } from "react";
import { Attraction, OpeningHour } from "@/interface/Attraction";
import Image from "next/image";

type ManageAttractionCardProps = {
  attraction: Attraction;
  onSave: (id: string, updatedData: Partial<Attraction>) => Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

function getIsOpen(openingHours?: Attraction["openingHours"]): boolean {
  if (!openingHours) return false;
  const now = new Date();
  const day = DAYS[now.getDay()];
  const hours = openingHours[day] as OpeningHour | undefined;
  if (!hours) return false;
  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= openH * 60 + openM && current < closeH * 60 + closeM;
}

const buildInitialFormData = (a: Attraction) => ({
  name: a.name,
  description: a.description ?? "",
  street: a.address.street ?? "",
  district: a.address.district,
  province: a.address.province,
  postalCode: a.address.postalCode ?? "",
});

export default function ManageAttractionCard({
  attraction,
  onSave,
  onDelete,
}: ManageAttractionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(buildInitialFormData(attraction));

  const isOpen = getIsOpen(attraction.openingHours);

  useEffect(() => {
    if (!isEditing) {
      setFormData(buildInitialFormData(attraction));
    }
  }, [attraction, isEditing]);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${attraction.name}?`)) return;
    await onDelete(attraction._id);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(attraction._id, {
        name: formData.name,
        description: formData.description,
        address: {
          street: formData.street,
          district: formData.district,
          province: formData.province,
          postalCode: formData.postalCode,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating attraction:", error);
      handleCancel();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(buildInitialFormData(attraction));
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none md:grid-cols-[170px_minmax(0,1fr)_auto] md:items-center">

      {/* --- Image --- */}
      <div className="relative h-30 w-50 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image
          src={attraction.img}
          alt={attraction.name}
          fill
          sizes="(max-width: 768px) 100vw, 170px"
          className="object-cover"
        />
      </div>

      {/* --- Content --- */}
      <div className="min-w-0 space-y-3 ml-15">
        {isEditing ? (
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="Attraction Name"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Description</label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="Short description"
                />
              </div>

              {/* Street */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Street</label>
                <input
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="Street"
                />
              </div>

              {/* District */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">District</label>
                <input
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="District"
                />
              </div>

              {/* Province */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Province</label>
                <input
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="Province"
                />
              </div>

              {/* Postal Code */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Postal Code</label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="Postal Code"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#f5f3ff]">
              {attraction.name}
            </h2>

            {attraction.description && (
              <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
                {attraction.description}
              </p>
            )}

            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">Address: </span>
              {[
                attraction.address.street,
                attraction.address.district,
                attraction.address.province,
                attraction.address.postalCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>

            <p className={`text-sm font-bold ${isOpen ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {isOpen ? "● Open" : "● Closed"}
            </p>
          </>
        )}
      </div>

      {/* --- Actions --- */}
      <div className="flex items-end justify-end gap-3 self-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0]"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}