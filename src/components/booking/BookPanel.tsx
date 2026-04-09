"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import createBooking from "@/lib/bookings/createBooking";
import { SummaryBooking } from "@/interface/Booking";
import { useSession } from "next-auth/react";
import getHotel from "@/lib/hotels/getHotel";
import { getNumberOfNights } from "@/util/getNumberOfNights";

export default function BookingPanel() {

    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const hotelId = searchParams.get("hotel") ?? "";

    const [hotelName, setHotelName] = useState<string>("");
    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");
    const [hotelImage, setHotelImage] = useState<string>("");
    
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
                setSuccessMessage(`Booking ${hotelName} from ${checkInDate} to ${checkOutDate} (${numberOfNights} nights) success!`);
                setTimeout(() => {
                    router.push('/booking');
                }, 2500);
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
            className="grid grid-cols-2 gap-4 w-full p-10 border border-slate-300 rounded-2xl bg-white shadow-md dark:bg-dark-secondary dark:border-none"
        >
            <div className="flex flex-col gap-4 space-y-3">
                <div className="flex flex-col">
                    <label className="font-semibold text-text-3 mb-1 dark:text-text-4">Hotel</label>
                    <input
                        type="text"
                        className="p-3 border border-gray-300 rounded-xl bg-secondary-gray focus:outline-none 
                        dark:bg-dark-secondary-0 dark:border-none"
                        placeholder={hotelName ? "" : loadingHotel ? "Loading hotel..." : "No hotel selected"}
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold text-text-3 mb-1 dark:text-text-4">Check-in Date</label>
                    <input
                        type="date"
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary
                        dark:bg-dark-secondary-1 dark:border-none dark:focus:bg-dark-primary dark:focus:ring-dark-primary"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold text-text-3 mb-1 dark:text-text-4">Check-out Date</label>
                    <input
                        type="date"
                        className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                        dark:bg-dark-secondary-1 dark:border-none dark:focus:bg-dark-primary dark:focus:ring-dark-primary"
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
                    objectFit="cover"
                />
            </div>

            {errorMessage && (
                <div className="col-span-2 text-center">
                    <p className="text-red-500 font-semibold text-sm">
                        {errorMessage}
                    </p>
                </div>
            )}

            {successMessage && (
                <div className="col-span-2 text-center">
                    <p className="text-text-2 font-semibold text-sm">
                        {successMessage}
                    </p>
                </div>
            )}

            <div className="col-span-2 flex justify-center">
                <button
                    type="submit"
                    className="px-8 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-accent focus:outline-none transition duration-200 dark:bg-dark-primary dark:hover:bg-dark-secondary-0 dark:hover:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                >
                    Book
                </button>
            </div>
        </form>
    )
}