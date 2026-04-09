"use client";

import { useState } from "react";
import BookingCard from "@/components/booking/BookingCard";
import type Booking from "@/interface/Booking";
import deleteBooking from "@/lib/bookings/deleteBooking";
import { useSession } from "next-auth/react";
import updateBooking from "@/lib/bookings/updateBooking";

type BookingListClientProps = {
  items: Booking[];
  onUpdate?: () => Promise<void>;
};

export default function BookingListClient({ items: initialItems, onUpdate }: BookingListClientProps) {
  const [items, setItems] = useState(initialItems);
  const { data: session } = useSession();

  const handleEdit = async (bookingId: string, checkInDate: string, checkOutDate: string) => {
    if (!session) return;
    try {
      const res = await updateBooking(bookingId, { checkInDate, checkOutDate }, session.user.token);
      if (!res.success) throw new Error(res.message);

      // Update local state
      setItems((currentItems) => currentItems.map((item) =>
        item._id === bookingId
          ? { ...item, booking: { ...item, checkInDate, checkOutDate } }
          : item
      ));

      if (onUpdate) await onUpdate();
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(error instanceof Error ? error.message : "Failed to update booking");
      throw error
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!session) return;
    try {
      const res = await deleteBooking(bookingId, session.user.token);
      if (!res.success) throw new Error(res.message);

      // Update local state
      setItems((currentItems) => currentItems.filter((item) => item._id !== bookingId));

      if (onUpdate) await onUpdate();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(error instanceof Error ? error.message : "Failed to delete booking");
      throw error;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            hotel={booking.hotel}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
      ))}
      {items.length === 0 && (
        <p className="rounded-lg bg-white dark:bg-[#25203e] p-6 text-slate-600 dark:text-[#ddd8f1] shadow">No bookings found.</p>
      )}
    </div>
  );
}
