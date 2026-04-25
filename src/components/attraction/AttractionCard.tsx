"use client";

import { useState } from "react";
import { Attraction } from "@/interface/Attraction";
import Image from "next/image";

type AttractionCardProps = {
  attraction: Attraction;
  onSave?: (id: string, updatedData: Partial<Attraction>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
};

export default function AttractionCard({ attraction, onSave, onDelete }: AttractionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: attraction.name,
    distance: attraction.distance,
    isOpen: attraction.isOpen,
  });

  const handleSaveClick = async () => {
    if (onSave) {
      await onSave(attraction.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData({
      name: attraction.name,
      distance: attraction.distance,
      isOpen: attraction.isOpen,
    });
  };

  return (
    <div
      className={`
        relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm 
        dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none transition-transform
        ${!isEditing && "hover:scale-[1.02] cursor-pointer"} 
      `}
    >
      {/* Image Container */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image 
          //src={attraction.img}
          src=""
          alt={`Attraction Image of ${attraction.name}`}
          sizes="(max-width: 768px) 100vw, 300px"
          fill
          className="object-cover"
        />
      </div>

      {isEditing ? (
        // --- EDIT MODE UI ---
        <div className="flex flex-col gap-3 flex-grow">
          <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">attraction name :</span>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0]"
              placeholder="Attraction Name"
            />
          </label>
          
          <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">distance :</span>
            <input
              type="text"
              value={editData.distance}
              onChange={(e) => setEditData({ ...editData, distance: e.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0]"
              placeholder="Distance (e.g. 5km)"
            />
          </label>
          
          <label className="flex items-center gap-2 mt-1 text-sm font-medium text-slate-700 dark:text-[#f1eefc] cursor-pointer">
            <input
              type="checkbox"
              checked={editData.isOpen}
              onChange={(e) => setEditData({ ...editData, isOpen: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            Currently Open
          </label>
        </div>
      ) : (

        // --- VIEW MODE UI ---
        <div className="flex flex-col flex-grow gap-1">
          <p className="font-bold text-lg text-slate-900 dark:text-[#f5f3ff]">
            {attraction.name}
          </p>

          <div className="flex justify-between items-center mt-auto pt-2">
            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">distance : </span>
              {attraction.distance}
            </p>
            <span
              className={`text-sm font-bold ${
                attraction.isOpen
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {attraction.isOpen ? "● Open" : "● Closed"}
            </span>
          </div>
        </div>
      )}

      {/* --- ACTION BUTTONS --- */}
      {(onSave || onDelete) && (
        <div className="flex justify-center gap-3 mt-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {onSave && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0]"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete ${attraction.name}?`)) {
                      onDelete(attraction.id);
                    }
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}