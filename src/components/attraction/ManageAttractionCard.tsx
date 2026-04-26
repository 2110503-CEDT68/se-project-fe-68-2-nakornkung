"use client";

import { useEffect, useState } from "react";
import { Attraction } from "@/interface/Attraction";
import Image from "next/image";

type ManageAttractionCardProps = {
  attraction: Attraction;
  onSave: (id: string, updatedData: Partial<Attraction>) => Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

const buildInitialFormData = (attraction: Attraction) => ({
  name: attraction.name,
  distance: attraction.distance,
  isOpen: attraction.isOpen,
});

export default function ManageAttractionCard({ attraction, onSave, onDelete }: ManageAttractionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(buildInitialFormData(attraction));

  useEffect(() => {
    if (!isEditing) {
      setFormData(buildInitialFormData(attraction));
    }
  }, [attraction, isEditing]);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${attraction.name}?`)) return;
    await onDelete(attraction.id);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(attraction.id, formData);
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none md:grid-cols-[170px_minmax(0,1fr)_auto] md:items-center">
      
      {/* --- Image Section --- */}
      <div className="relative h-30 w-50 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image
          // src={attraction.img} 
          src=""
          alt={attraction.name}
          fill
          sizes="(max-width: 768px) 100vw, 170px"
          className="object-cover"
        />
      </div>

      {/* --- Content Section --- */}
      <div className="min-w-0 space-y-3 ml-15">
        {isEditing ? (
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
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
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Distance</label>
                <input
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  placeholder="e.g. 5km"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 mt-1 text-sm font-medium text-slate-700 dark:text-[#f1eefc] cursor-pointer w-max">
              <input
                type="checkbox"
                name="isOpen"
                checked={formData.isOpen}
                onChange={handleChange}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-[#1f1a35] dark:border-[#433b68]"
              />
              Currently Open
            </label>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#f5f3ff]">
              {attraction.name}
            </h2>

            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">distance : </span>
              {attraction.distance}
            </p>

            <p className={`text-sm font-bold ${attraction.isOpen ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {attraction.isOpen ? "● Open" : "● Closed"}
            </p>
          </>
        )}
      </div>

      {/* --- Actions Section --- */}
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