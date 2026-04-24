"use client";

import TransportationBookingCard from "@/components/transport/TransportationBookingCard";
import TransportLocationTooltip from "@/components/transport/TransportLocationTooltip";
import provinces from "@/data/provinces";
import { Transportation, TransportationType, transportationTypes } from "@/interface/Transportation";
import { TransportationBooking } from "@/interface/TransportationBooking";
import getTransportations from "@/lib/transportation/getTransportations";
import capitalize from "@/util/capitalize";
import { useDebounceSearch } from "@/util/useDebounceSearch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface TransportationBookingSectionProps {
  bookings: TransportationBooking[];
  onEdit?: (
    transportBookingId: string,
    departureDateTime: string,
    passengerNumber: number
  ) => Promise<void>;
  onDelete?: (transportBookingId: string) => Promise<void>;
  onAdd?: (
    transport: Transportation,
    departure: string,
    passengers: number
  ) => Promise<void>;
  setPending: (pending: boolean) => void;
}

export default function TransportationBookingSection({
  bookings = [],
  onEdit,
  onDelete,
  onAdd,
  setPending,
}: TransportationBookingSectionProps) {
  const { data: session } = useSession();
  const [transports, setTransports] = useState<Transportation[]>([]);
  
  // Transport listing
  const [isExpanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [transportType, setTransportType] = useState<TransportationType | "">("");
  const [province, setProvince] = useState("");

  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDeparture, setEditDeparture] = useState("");
  const [editPassengers, setEditPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Draft state for adding a NEW transport
  const [addingTransport, setAddingTransport] = useState<Transportation | null>(null);
  const [addDeparture, setAddDeparture] = useState("");
  const [addPassengers, setAddPassengers] = useState(1);

  const searchQuery = useDebounceSearch(search);

  useEffect(() => {
    setPending(addingTransport !== null || editingId !== null);
  }, [addingTransport, editingId, setPending]);

  useEffect(() => {
    if (!session) return;
    const loadTransports = async () => {
      const res = await getTransportations(session.user.token, { search: searchQuery, type: transportType, province });
      if (!res.success) {
        console.error("Error fetching transportation:", res.message);
        return;
      }
      setTransports(res.data);
    };
    loadTransports();
  }, [session, searchQuery, transportType, province]);

  // --- Edit Existing Handlers ---
  const handleStartEdit = (tb: TransportationBooking) => {
    setEditingId(tb._id);
    setEditDeparture(tb.departureDateTime?.slice(0, 16) ?? "");
    setEditPassengers(tb.passengerNumber);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (transportBookingId: string) => {
    if (!editDeparture) {
      alert("Please fill in departure date");
      return;
    }
    if (editPassengers < 1) {
      alert("Passenger count must be at least 1");
      return;
    }
    setIsLoading(true);
    try {
      await onEdit?.(transportBookingId, editDeparture, editPassengers);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating transport booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (transportBookingId: string) => {
    if (!confirm("Are you sure you want to remove this transport booking?")) return;
    setIsLoading(true);
    try {
      await onDelete?.(transportBookingId);
    } catch (error) {
      console.error("Error deleting transport booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Add New Handlers ---
  const handleSelectTransportToAdd = (transport: Transportation) => {
    setAddingTransport(transport);
    setAddDeparture("");
    setAddPassengers(1);
  };

  const handleConfirmAdd = async () => {
    if (!addingTransport) return;
    if (!addDeparture) {
      alert("Please fill in departure date");
      return;
    }
    if (addPassengers < 1) {
      alert("Passenger count must be at least 1");
      return;
    }

    setIsLoading(true);
    try {
      await onAdd?.(addingTransport, addDeparture, addPassengers);
      // Reset drafting state on success
      setAddingTransport(null);
      setExpanded(false);
    } catch (error) {
      console.error("Error adding transport booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-2 rounded-2xl border border-gray-300 bg-secondary-gray dark:bg-dark-secondary-0 dark:border-none">
      <div>
        <div className="font-bold">Transportation Bookings</div>
        <ul className="my-2 px-2 flex flex-col gap-3">
          {bookings.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
              No transport bookings yet.
            </p>
          )}
          {bookings.map((tb) => {
            const isEditing = editingId === tb._id;
            const t = tb.transportation;
            return (
              <li
                key={tb._id}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-[#3a3360] dark:bg-[#1e1933]"
              >
                {/* Transport info */}
                <div className="font-semibold text-sm text-slate-800 dark:text-[#f5f3ff]">
                  <div>{t.name}</div>
                  <div> by {t.providerName ?? ""} ({capitalize(t.type)})</div>
                  {t.pickUpArea && t.dropOffArea && (
                    <>
                      : <TransportLocationTooltip location={t.pickUpArea} /> to{" "}
                      <TransportLocationTooltip location={t.dropOffArea} />
                    </>
                  )}
                </div>

                {/* Inline edit form */}
                {isEditing ? (
                  <div className="flex flex-wrap gap-3">
                    <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
                      <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                        Departure :
                      </span>
                      <input
                        type="datetime-local"
                        value={editDeparture}
                        onChange={(e) => setEditDeparture(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
                      <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                        Passengers :
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={editPassengers}
                        onChange={(e) => setEditPassengers(Number(e.target.value))}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0]"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
                    <span>
                      <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                        Departure :{" "}
                      </span>
                      {tb.departureDateTime
                        ? new Date(tb.departureDateTime).toLocaleString("en-TH")
                        : "Not set"}
                    </span>
                    <span>
                      <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                        Passengers :{" "}
                      </span>
                      {tb.passengerNumber}
                    </span>
                    <span>
                      <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                        Price :{" "}
                      </span>
                      {(tb.passengerNumber * t.price).toLocaleString()}฿
                    </span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(tb._id)}
                        disabled={isLoading}
                        className="rounded-xl bg-indigo-700 px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
                      >
                        {isLoading ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={isLoading}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b]"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(tb)}
                        className="rounded-xl bg-indigo-700 px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(tb._id)}
                        disabled={isLoading}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b]"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Add new transport ── */}
      <div className="rounded-xl border border-gray-300 dark:bg-dark-secondary-1 dark:border-none">
        <div
          className="p-4 pl-6 flex gap-4 cursor-pointer"
          onClick={() => {
            setExpanded(!isExpanded);
            if (isExpanded) setAddingTransport(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`fill-none stroke-current transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div>Add new booking</div>
        </div>

        {/* Available Transport List */}
        {isExpanded && !addingTransport && (
          <div className="flex gap-2 flex-col p-4 pt-0">
            <div className="flex gap-2 max-w-200">
              <input
                className="w-full rounded-l-2xl rounded-r-lg border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 placeholder:text-slate-400 placeholder:italic focus:border-indigo-500 focus:bg-white focus:outline-none
                dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className={`w-full rounded-l-lg rounded-r-lg border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 focus:border-indigo-500
                dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary
                focus:bg-white focus:outline-none ${transportType ? "text-slate-700" : "text-slate-400 italic"}`}
                value={transportType}
                onChange={(e) => setTransportType(e.target.value as TransportationType | "")}
              >
                <option label="Any type" />

                {transportationTypes.map((type) => (<option key={type} value={type}>{capitalize(type)}</option>))}
              </select>

              <select
                className={`w-full rounded-l-lg rounded-r-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base font-medium text-slate-700 focus:border-indigo-500
                dark:bg-dark-primary dark:border-dark-secondary-1 dark:placeholder:text-secondary-gray dark:text-secondary-gray dark:focus:bg-dark-secondary
                focus:bg-white focus:outline-none ${province ? "text-slate-700" : "text-slate-400 italic"}`}
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option label="Any province" />

                {provinces.map((province) => (<option key={province}>{province}</option>))}
              </select>
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {transports.map((transport) => (
                <TransportationBookingCard
                  key={transport._id}
                  transport={transport}
                  handleBook={handleSelectTransportToAdd}
                />
              ))}
            </div>
          </div>
        )}

        {/* Input Form for Selected Transport */}
        {isExpanded && addingTransport && (
          <div className="p-4 pt-0">
            <div className="flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-[#3a3360] dark:bg-[#201b36]">
              <div className="font-semibold text-sm text-slate-800 dark:text-[#f5f3ff]">
                New Booking: {addingTransport.name} by {addingTransport.providerName}
              </div>
              <div className="flex flex-wrap gap-3">
                <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
                  <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                    Departure :
                  </span>
                  <input
                    type="datetime-local"
                    value={addDeparture}
                    onChange={(e) => setAddDeparture(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-500 dark:text-[#c7c2dc]">
                  <span className="font-medium text-slate-700 dark:text-[#f1eefc]">
                    Passengers :
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={addPassengers}
                    onChange={(e) => setAddPassengers(Number(e.target.value))}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0]"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleConfirmAdd}
                  disabled={isLoading}
                  className="rounded-xl bg-indigo-700 px-5 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
                >
                  {isLoading ? "Adding..." : "Confirm Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setAddingTransport(null)}
                  disabled={isLoading}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}