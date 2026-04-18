"use client";
import type Hotel from "@/interface/Hotel";
import type Booking from "@/interface/Booking";
import type { TransportationBooking } from "@/interface/TransportationBooking";
import type { Transportation } from "@/interface/Transportation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getNumberOfNights } from "@/util/getNumberOfNights";
import TransportationBookingSection from "@/components/transport/TransportationBookingSection";

const dateLocale = Intl.DateTimeFormat("en-TH", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

const dtLocale = Intl.DateTimeFormat("en-TH", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

type BookingCardProps = {
  booking: Booking;
  hotel: Hotel;
  transportBookings?: TransportationBooking[];
  onSave?: (
    bookingId: string,
    checkInDate: string,
    checkOutDate: string,
    pendingTransportBookings: TransportationBooking[],
    originalTransportBookings: TransportationBooking[]
  ) => Promise<void>;
  onDelete?: (bookingId: string) => Promise<void>;
};

export default function BookingCard({
  booking,
  hotel,
  transportBookings = [],
  onSave,
  onDelete,
}: BookingCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [checkInDate, setCheckInDate] = useState(booking.checkInDate.split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(booking.checkOutDate.split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [pendingTransportBookings, setPendingTransportBookings] = useState<TransportationBooking[]>(transportBookings);

  useEffect(() => {
    if (!isEditing) setPendingTransportBookings(transportBookings);
  }, [transportBookings, isEditing]);

  const numberOfNights = getNumberOfNights(checkInDate, checkOutDate);

  const handleAddTransport = async (
    transport: Transportation,
    departure: string,
    returnDT: string,
    passengers: number
  ) => {
    const newBooking = {
      _id: `temp-${Date.now()}`,
      booking: booking._id,
      transportation: transport,
      departureDateTime: departure,
      returnDateTime: returnDT,
      passengerNumber: passengers,
    } as TransportationBooking;
    setPendingTransportBookings((prev) => [...prev, newBooking]);
  };

  const handleEditTransport = async (
    transportBookingId: string,
    departureDateTime: string,
    returnDateTime: string,
    passengerNumber: number
  ) => {
    setPendingTransportBookings((prev) =>
      prev.map((tb) =>
        tb._id === transportBookingId
          ? { ...tb, departureDateTime, returnDateTime, passengerNumber }
          : tb
      )
    );
  };

  const handleDeleteTransport = async (transportBookingId: string) => {
    setPendingTransportBookings((prev) => prev.filter((tb) => tb._id !== transportBookingId));
  };

  const handleSave = async () => {
    setErrorMessage("");
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (checkInDate >= checkOutDate) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }
    if (numberOfNights > 3) {
      setErrorMessage("Cannot book more than 3 nights");
      return;
    }
    setIsLoading(true);
    try {
      await onSave?.(booking._id, checkInDate, checkOutDate, pendingTransportBookings, transportBookings);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving booking:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to save booking");
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
    setPendingTransportBookings(transportBookings);
    setErrorMessage("");
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setPendingTransportBookings(transportBookings);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none">

      {/* Top: image + booking info */}
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50] md:w-44">
          <Image
            src={hotel.img}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, 176px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-[#f5f3ff]">{hotel.name}</h2>
          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">address : </span>
            {hotel.address}, {hotel.district}, {hotel.province} {hotel.postalcode}
          </p>

          {isEditing ? (
            <div className="grid gap-3 pt-1 md:grid-cols-2">
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
      </div>

      {/* Transport — editable section or read-only summary */}
      {isEditing ? (
        <TransportationBookingSection
          bookings={pendingTransportBookings}
          onAdd={handleAddTransport}
          onEdit={handleEditTransport}
          onDelete={handleDeleteTransport}
        />
      ) : (
        transportBookings.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-[#f1eefc]">Transportation</p>
            <div className="flex flex-col gap-2">
              {transportBookings.map((tb) => (
                <div
                  key={tb._id}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm dark:border-[#3a3360] dark:bg-[#1f1a35]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
                    <span className="font-semibold text-slate-800 dark:text-[#f5f3ff]">
                      {tb.transportation.name}
                      <span className="ml-2 font-normal capitalize text-slate-400 dark:text-[#9d97bc]">
                        ({tb.transportation.type})
                      </span>
                    </span>
                    <span className="font-medium text-indigo-600 dark:text-[#a89fd4]">
                      ฿{tb.transportation.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-6 gap-y-0.5 text-slate-500 dark:text-[#c7c2dc]">
                    <span>
                      <span className="font-medium text-slate-600 dark:text-[#ddd8f1]">departure : </span>
                      {dtLocale.format(new Date(tb.departureDateTime))}
                    </span>
                    <span>
                      <span className="font-medium text-slate-600 dark:text-[#ddd8f1]">passengers : </span>
                      {tb.passengerNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* Error */}
      {isEditing && errorMessage && (
        <p className="text-center text-sm font-semibold text-red-500">{errorMessage}</p>
      )}

      {/* Buttons — bottom center */}
      <div className="flex justify-center gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
            >
              {isLoading ? "Saving..." : "Save Changes"}
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
              onClick={handleStartEdit}
              className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0]"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
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