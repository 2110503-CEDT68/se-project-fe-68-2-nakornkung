"use client";

import BookingPanel from "@/components/booking/BookPanel";
import useUserFilter from "@/util/useUserFilter";


export default function Booking() {
    const [allowed] = useUserFilter();

    if (!allowed) return <></>;

    return (
        <main className="flex flex-col my-8 px-10 w-3xl max-w-full h-full items-center gap-10">
            
            <div className="text-5xl font-bold mt-10 text-text-2 dark:text-text-4">
                Make Your Booking
            </div>

            <BookingPanel/>

        </main>
    )
}