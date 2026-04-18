"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import createBooking from "@/lib/bookings/createBooking";
import { SummaryBooking } from "@/interface/Booking";
import { useSession } from "next-auth/react";
import getHotel from "@/lib/hotels/getHotel";
import { getNumberOfNights } from "@/util/getNumberOfNights";
import TransportationBookingSection from "@/components/transport/TransportationBookingSection";
import { TransportationBooking } from "@/interface/TransportationBooking";
import { Transportation } from "@/interface/Transportation";
import createTransportationBooking from "@/lib/transportationBooking/createTransportation";

export default function BookingPanel() {
    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const hotelId = searchParams.get("hotel") ?? "";

    const [hotelName, setHotelName] = useState<string>("");
    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");
    const [hotelImage, setHotelImage] = useState<string>("");
    
    // Use the unified TransportationBooking interface with temporary IDs for pending bookings
    const [transportBookings, setTransportBookings] = useState<TransportationBooking[]>([]);
    
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loadingHotel, setLoadingHotel] = useState<boolean>(false);
    
    const numberOfNights = getNumberOfNights(checkInDate, checkOutDate);

    // Hotel Name and Image
    useEffect(() => {
        const fetchHotel = async () => {
            if (!hotelId) return;

            setLoadingHotel(true);
            try {
                const response = await getHotel(hotelId);
                if (response.success && response.data) {
                    setHotelName(response.data.name);
                    setHotelImage(response.data.img || "");
                } else {
                    setErrorMessage("Failed to load hotel information");
                }
            } catch (error: unknown) {
                setErrorMessage(error instanceof Error ? error.message : "Error fetching hotel data");
            } finally {
                setLoadingHotel(false);
            }
        };

        fetchHotel();
    }, [hotelId]);

    // Local handlers for pending transport bookings
    const handleAddTransport = async (
        transport: Transportation,
        departure: string,
        returnDT: string,
        passengers: number
    ) => {
        const newBooking = {
            _id: `temp-${Date.now()}`, // Temporary ID for the UI
            booking: "", // No hotel booking ID yet
            transportation: transport,
            departureDateTime: departure,
            returnDateTime: returnDT,
            passengerNumber: passengers,
        } as TransportationBooking;
        setTransportBookings((prev) => [...prev, newBooking]);
    };

    const handleEditTransport = async (
        transportBookingId: string,
        departureDateTime: string,
        returnDateTime: string,
        passengerNumber: number
    ) => {
        setTransportBookings((prev) =>
            prev.map((tb) =>
                tb._id === transportBookingId
                    ? { ...tb, departureDateTime, returnDateTime, passengerNumber }
                    : tb
            )
        );
    };

    const handleDeleteTransport = async (transportBookingId: string) => {
        setTransportBookings((prev) => prev.filter((tb) => tb._id !== transportBookingId));
    };

    // Show Creating Complete and Redirect
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!session?.user) {
            setErrorMessage("Please login first");
            return;
        }

        if (numberOfNights <= 0) {
            setErrorMessage("Check-Out date cannot be less than or equal to Check-In date");
            return;
        } else if (numberOfNights > 3) {
            setErrorMessage("Can not book more than 3 nights");
            return;
        }

        const booking: SummaryBooking = {
            hotelId: hotelId,
            userId: session.user.id,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            bookingDate: new Date().toISOString(),
        };

        try {
            const createResult = await createBooking(booking, session.user.token);

            if (createResult.success) {
                const bookingId = createResult.data._id;
                
                // Map the UI state to the payload expected by your backend
                const transportBookingResults = await Promise.all(
                    transportBookings.map(async (tb) => {
                        const payload = {
                            transport: tb.transportation,
                            departure: tb.departureDateTime,
                            returnDT: tb.returnDateTime, // include if your API supports it
                            passengerNumber: String(tb.passengerNumber),
                        };
                        return createTransportationBooking(bookingId, payload, session.user.token);
                    })
                );

                const errors = transportBookingResults.filter((res) => !res.success).map((res) => res.message);
                if (errors.length === 0) {
                    setSuccessMessage(`Booking ${hotelName} from ${checkInDate} to ${checkOutDate} (${numberOfNights} nights) with ${transportBookings.length} transport bookings success!`);
                    setTimeout(() => {
                        router.push('/booking');
                    }, 2500);
                } else {
                    setErrorMessage(errors.join("\n") || "Failed to create transport bookings. Please try again.");
                }
            } else {
                setErrorMessage(createResult.message || "Failed to create booking. Please try again.");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to create booking. Please try again.";
            setErrorMessage(msg);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full p-10 border border-slate-300 rounded-2xl bg-white shadow-md dark:bg-dark-secondary dark:border-none"
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4 space-y-3">
                    <div className="flex flex-col">
                        <label className="font-semibold text-text-3 mb-1 dark:text-text-4">Hotel</label>
                        <input
                            type="text"
                            className="p-3 border border-gray-300 rounded-xl bg-secondary-gray focus:outline-none dark:bg-dark-secondary-0 dark:border-none"
                            placeholder={hotelName ? "" : loadingHotel ? "Loading hotel..." : "No hotel selected"}
                            value={hotelName}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-text-3 mb-1 dark:text-text-4">Check-in Date</label>
                        <input
                            type="date"
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary-1 dark:border-none dark:focus:bg-dark-primary dark:focus:ring-dark-primary dark:scheme-dark"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-text-3 mb-1 dark:text-text-4">Check-out Date</label>
                        <input
                            type="date"
                            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary-1 dark:border-none dark:focus:bg-dark-primary dark:focus:ring-dark-primary dark:scheme-dark"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="font-semibold text-gray-700 dark:text-text-4">
                        Number of Nights: {Number.isNaN(numberOfNights) || numberOfNights < 0 ? "" : numberOfNights}
                    </div>
                </div>

                <div className="relative h-64 rounded-4xl overflow-hidden select-none mt-4">
                    <Image
                        src={hotelImage || "/banner.jpg"}
                        alt={`Image of ${hotelName || "hotel"}`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <TransportationBookingSection 
                bookings={transportBookings} 
                onAdd={handleAddTransport}
                onEdit={handleEditTransport}
                onDelete={handleDeleteTransport}
            />

            {errorMessage && (
                <div className="text-center">
                    <p className="text-red-500 font-semibold text-sm">
                        {errorMessage}
                    </p>
                </div>
            )}

            {successMessage && (
                <div className="text-center">
                    <p className="text-text-2 font-semibold text-sm">
                        {successMessage}
                    </p>
                </div>
            )}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="px-8 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-accent focus:outline-none transition duration-200 dark:bg-dark-primary dark:hover:bg-dark-secondary-0 dark:hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                >
                    Book
                </button>
            </div>
        </form>
    );
}