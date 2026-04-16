"use client";
import type Hotel from "@/interface/Hotel";
import type Booking from "@/interface/Booking";
import Image from "next/image";
import { useState } from "react";
import { getNumberOfNights } from "@/util/getNumberOfNights";

const dateLocale = Intl.DateTimeFormat("en-TH", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

type BookingCardProps = {
  booking: Booking;
  hotel: Hotel;
  onEdit?: (bookingId: string, checkInDate: string, checkOutDate: string) => Promise<void>;
  onDelete?: (bookingId: string) => Promise<void>;
};

export default function BookingCard({ booking, hotel, onEdit, onDelete }: BookingCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [checkInDate, setCheckInDate] = useState(booking.checkInDate.split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(booking.checkOutDate.split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);

  const numberOfNights = getNumberOfNights(checkInDate, checkOutDate);

  const handleSave = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please fill in all fields");
      return;
    }
    if (checkInDate >= checkOutDate) {
      alert("Check-out date must be after check-in date");
      return;
    }
    setIsLoading(true);
    try {
      await onEdit?.(booking._id, checkInDate, checkOutDate);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      handleCancel();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    setIsLoading(true);
    try {
      await onDelete?.(booking._id);
    } catch (error) {
      console.error("Error deleting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCheckInDate(booking.checkInDate.split("T")[0]);
    setCheckOutDate(booking.checkOutDate.split("T")[0]);
    setIsEditing(false);
  };

  return (
    <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none md:grid-cols-[170px_minmax(0,1fr)_auto] md:items-center">
      <div className="w-50 h-30 relative overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image
          src={hotel.img}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, 170px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 space-y-1 ml-15 ">
        <h2 className="text-lg font-bold text-slate-900 dark:text-[#f5f3ff]">{hotel.name}</h2>
        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">address : </span>
          {hotel.address}, {hotel.district}, {hotel.province} {hotel.postalcode}
        </p>

        {isEditing ? (
          <div className="grid gap-3 md:grid-cols-2 ">
            <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">check-in :</span>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">check-out :</span>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
              />
            </label>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">check-in : </span>
              {dateLocale.format(new Date(booking.checkInDate))}
            </p>
            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              <span className="font-medium text-slate-700 dark:text-[#f1eefc]">check-out : </span>
              {dateLocale.format(new Date(booking.checkOutDate))}
            </p>
          </>
        )}

        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">number of nights : </span>
          {Number.isNaN(numberOfNights) || numberOfNights < 0 ? "" : numberOfNights}
        </p>

        <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
          <span className="font-medium text-slate-700 dark:text-[#f1eefc]">booked by : </span>
          {booking.user.name}
        </p>
      </div>

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
              disabled={isLoading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f]  dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
