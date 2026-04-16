"use client";

import TransportationBookingCard from "@/components/transport/TransportationBookingCard";
import TransportLocationTooltip from "@/components/transport/TransportLocationTooltip";
import { Transportation } from "@/interface/Transportation";
import getTransportations from "@/lib/transportation/getTransportations";
import capitalize from "@/util/capitalize";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface TransportBookingInfo {
  transport: Transportation;
  departure: string;
  passengerNumber: string;
}

export default function TransportationBookingSection() {
  const { data: session } = useSession();
  const [transports, setTransports] = useState<Transportation[]>([]);
  const [bookings, setBookings] = useState<TransportBookingInfo[]>([]);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!session) return;
    const loadTransports = async () => {
      const res = await getTransportations(session.user.token); // add filtering
      if (!res.success) {
        console.error("Error fetching transportation:", res.message);
        return;
      }
      setTransports(res.data);
    };
    loadTransports();
  }, [session]);

  const handleBook = (transport: Transportation) => {
    setBookings([...bookings, { transport, departure: "", passengerNumber: "" }]);
  };

  return (
    <div className="p-4 flex flex-col gap-2 rounded-2xl border border-gray-300 bg-secondary-gray dark:bg-dark-secondary-0 dark:border-none">
      <div>
        <div className="font-bold">Transportation Bookings</div>
        {bookings.length} booking(s)
        <ul className="my-2 px-2">
          {bookings.map((transportBooking, i) => (
            <li key={i} className="flex flex-col gap-2">
              <div className="font-semibold">
                {transportBooking.transport.name} by {transportBooking.transport.providerName} ({capitalize(transportBooking.transport.type)}): <TransportLocationTooltip location={transportBooking.transport.pickUpArea} /> to <TransportLocationTooltip location={transportBooking.transport.dropOffArea} />
              </div>
              <div className="flex gap-4 items-center ml-4">
                <div>
                  <input
                    type="datetime-local"
                    className="p-2 w-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary
                    dark:bg-dark-secondary-1 dark:border-none dark:focus:bg-dark-primary dark:focus:ring-dark-primary dark:scheme-dark"
                    value={transportBooking.departure}
                    onChange={(e) => setBookings(bookings.with(i, { ...transportBooking, departure: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    type="number"
                    className="p-2 w-18 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary
                    dark:bg-dark-secondary-1 dark:border-none dark:focus:bg-dark-primary dark:focus:ring-dark-primary"
                    value={transportBooking.passengerNumber}
                    onChange={(e) => setBookings(bookings.with(i, { ...transportBooking, passengerNumber: e.target.value }))}
                    onBlur={(e) => setBookings(bookings.with(i, { ...transportBooking, passengerNumber: String(Math.min(Math.max(Math.trunc(e.target.valueAsNumber) || 0, 1), 2000)) }))}
                    min={1}
                    required
                  />
                  {Math.min(Math.max(Math.trunc(Number(transportBooking.passengerNumber)), 0), 2000) * transportBooking.transport.price}฿
                </div>
                <div className="grow" />
                <div onClick={() => confirm("Delete transportation booking?") && setBookings((bookings) => bookings.filter((_, idx) => idx !== i))}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-current hover:stroke-red-500 transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-gray-300 dark:bg-dark-secondary-1 dark:border-none">
        <div className="p-4 pl-6 flex gap-4" onClick={() => setExpanded(!isExpanded)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={`fill-none stroke-current transition-transform ${isExpanded ? "rotate-90" : ""}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          <div>Add new booking</div>
        </div>

        {isExpanded && (
          <div className="flex gap-4 p-4 pt-0 overflow-x-auto">
            {transports.map((transport) => <TransportationBookingCard key={transport._id} transport={transport} handleBook={handleBook} />)}
          </div>
        )}
      </div>
    </div>
  );
}
