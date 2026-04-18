"use client";

import { useState, useEffect } from "react";
import BookingCard from "@/components/booking/BookingCard";
import type Booking from "@/interface/Booking";
import type { TransportationBooking } from "@/interface/TransportationBooking";
import deleteBooking from "@/lib/bookings/deleteBooking";
import updateBooking from "@/lib/bookings/updateBooking";
import getTransportationBookings from "@/lib/transportationBooking/getTransportationBookings";
import updateTransportationBooking from "@/lib/transportationBooking/updateTransportationBooking";
import deleteTransportationBooking from "@/lib/transportationBooking/deleteTransportationBooking";
import createTransportationBooking from "@/lib/transportationBooking/createTransportation";
import { useSession } from "next-auth/react";

type BookingListClientProps = {
  items: Booking[];
  onUpdate?: () => Promise<void>;
};

export default function BookingListClient({ items: initialItems, onUpdate }: BookingListClientProps) {
  const [items, setItems] = useState(initialItems);
  const [transportBookings, setTransportBookings] = useState<TransportationBooking[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.token) return;
    getTransportationBookings(session.user.token).then((res) => {
      if (res.success) setTransportBookings(res.data);
    });
  }, [session?.user?.token]);

  // Single save handler — reconciles dates + transport bookings all at once,
  // mirroring how BookPanel's handleSubmit fires everything off together.
  const handleSave = async (
    bookingId: string,
    checkInDate: string,
    checkOutDate: string,
    pendingTransportBookings: TransportationBooking[],
    originalTransportBookings: TransportationBooking[]
  ) => {
    if (!session) return;

    const res = await updateBooking(bookingId, { checkInDate, checkOutDate }, session.user.token);
    if (!res.success) throw new Error(res.message);

    const originalIds = new Set(originalTransportBookings.map((tb) => tb._id));
    const pendingIds = new Set(pendingTransportBookings.map((tb) => tb._id));

    const toDelete = originalTransportBookings.filter((tb) => !pendingIds.has(tb._id));

    const toCreate = pendingTransportBookings.filter((tb) => tb._id.startsWith("temp-"));

    const toUpdate = pendingTransportBookings.filter(
      (tb) => !tb._id.startsWith("temp-") && originalIds.has(tb._id)
    );

    const results = await Promise.all([
      ...toDelete.map((tb) => deleteTransportationBooking(session.user.token, tb._id)),
      ...toCreate.map((tb) =>
        createTransportationBooking(
          bookingId,
          {
            transport: tb.transportation,
            departure: tb.departureDateTime,
            passengerNumber: String(tb.passengerNumber),
          },
          session.user.token
        )
      ),
      ...toUpdate.map((tb) =>
        updateTransportationBooking(session.user.token, tb._id, {
          departureDateTime: tb.departureDateTime,
          passengerNumber: tb.passengerNumber,
        })
      ),
    ]);

    const errors = results.filter((r) => !r.success).map((r) => r.message);
    if (errors.length > 0) throw new Error(errors.join("\n"));

    const fresh = await getTransportationBookings(session.user.token);
    if (fresh.success) setTransportBookings(fresh.data);

    setItems((current) =>
      current.map((item) =>
        item._id === bookingId ? { ...item, checkInDate, checkOutDate } : item
      )
    );

    if (onUpdate) await onUpdate();
  };

  const handleDelete = async (bookingId: string) => {
    if (!session) return;
    try {
      const res = await deleteBooking(bookingId, session.user.token);
      if (!res.success) throw new Error(res.message);

      setItems((current) => current.filter((item) => item._id !== bookingId));

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
          transportBookings={transportBookings.filter((tb) => tb.booking === booking._id)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      {items.length === 0 && (
        <p className="rounded-lg bg-white dark:bg-[#25203e] p-6 text-slate-600 dark:text-[#ddd8f1] shadow">
          No bookings found.
        </p>
      )}
    </div>
  );
}