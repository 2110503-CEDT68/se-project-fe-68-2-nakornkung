"use client";

import { useState, useEffect } from "react";
import BookingCard from "@/components/booking/BookingCard";
import type Booking from "@/interface/Booking";
import type { TransportationBooking } from "@/interface/TransportationBooking";
import type { Transportation } from "@/interface/Transportation";
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

  const handleEdit = async (bookingId: string, checkInDate: string, checkOutDate: string) => {
    if (!session) return;
    try {
      const res = await updateBooking(bookingId, { checkInDate, checkOutDate }, session.user.token);
      if (!res.success) throw new Error(res.message);

      setItems((current) =>
        current.map((item) =>
          item._id === bookingId ? { ...item, checkInDate, checkOutDate } : item
        )
      );

      if (onUpdate) await onUpdate();
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(error instanceof Error ? error.message : "Failed to update booking");
      throw error;
    }
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

  const handleEditTransport = async (
    transportBookingId: string,
    departureDateTime: string,
    returnDateTime: string,
    passengerNumber: number
  ) => {
    if (!session) return;
    try {
      const res = await updateTransportationBooking(session.user.token, transportBookingId, {
        departureDateTime,
        returnDateTime,
        passengerNumber,
      });
      if (!res.success) throw new Error(res.message);

      setTransportBookings((current) =>
        current.map((tb) =>
          tb._id === transportBookingId
            ? { ...tb, departureDateTime, returnDateTime, passengerNumber }
            : tb
        )
      );
    } catch (error) {
      console.error("Error updating transport booking:", error);
      alert(error instanceof Error ? error.message : "Failed to update transport booking");
      throw error;
    }
  };

  const handleDeleteTransport = async (transportBookingId: string) => {
    if (!session) return;
    try {
      const res = await deleteTransportationBooking(session.user.token, transportBookingId);
      if (!res.success) throw new Error(res.message);

      setTransportBookings((current) => current.filter((tb) => tb._id !== transportBookingId));
    } catch (error) {
      console.error("Error deleting transport booking:", error);
      alert(error instanceof Error ? error.message : "Failed to delete transport booking");
      throw error;
    }
  };

  const handleAddTransport = (bookingId: string) => async (
    transport: Transportation,
    departure: string,
    returnDT: string,
    passengers: number
  ) => {
    if (!session) return;
    try {
      const res = await createTransportationBooking(
        bookingId,
        { transport, departure, passengerNumber: String(passengers) },
        session.user.token
      );
      if (!res.success) throw new Error(res.message);

      setTransportBookings((current) => [...current, res.data]);
    } catch (error) {
      console.error("Error creating transport booking:", error);
      alert(error instanceof Error ? error.message : "Failed to create transport booking");
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
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEditTransport={handleEditTransport}
          onDeleteTransport={handleDeleteTransport}
          onAddTransport={handleAddTransport(booking._id)}
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