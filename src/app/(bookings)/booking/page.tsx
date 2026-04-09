"use client";

import { useEffect, useState } from "react";
import BookingListClient from "@/components/booking/BookingListClient";
import getBookings from "@/lib/bookings/getBookings";
import useUserFilter from "@/util/useUserFilter";
import Booking from "@/interface/Booking";
import Loading from "@/components/Loading";
import PaginationControls from "@/components/PaginationControls";

export default function BookingPage() {
  const [allowed, session] = useUserFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!session) return;
    const loadBookings = async () => {
      setLoading(true);
      const res = await getBookings(session.user.token, { page, limit });
      if (!res.success) {
        console.error("Error loading bookings: ", res.message);
        return;
      }
      setBookings(res.data);
      setTotal(res.total);
      setLoading(false);
      setFirstLoad(false);
    };
    loadBookings();
  }, [session, page, limit]);

  if (!allowed) return <></>;

  const isAdmin = session.user.role === "admin";

  return (
    <main className="my-6 w-11/12 max-w-7xl space-y-4">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-[#f5f3ff] mb-8">
        {isAdmin ? "All Bookings" : "My Bookings"}
      </h1>
      
      {bookings.length > 0 || firstLoad ? (
        <>
          <div className="flex ml-20 self-start items-center gap-12">
            <div className="text-gray-400">{(page - 1) * limit + 1} – {Math.min(page * limit, total)} of {total} results</div>
            <PaginationControls pages={Math.ceil(total / limit)} currentPage={page} limit={limit} setPage={setPage} setLimit={setLimit} />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <BookingListClient items={bookings} />
          )}
        </>
      ) : (
        <p className="rounded-lg bg-white dark:bg-[#25203e] p-6 text-slate-600 dark:text-[#ddd8f1] shadow">No bookings found.</p>
      )}
    </main>
  );
}
