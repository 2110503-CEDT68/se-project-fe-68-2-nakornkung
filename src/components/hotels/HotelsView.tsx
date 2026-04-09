"use client";

import { useEffect, useState } from "react";
import HotelSearch from "./HotelSearch";
import HotelCard from "./HotelCard";
import getHotels from "@/lib/hotels/getHotels";
import { useDebounceSearch } from "@/util/useDebounceSearch";
import type Hotel from "@/interface/Hotel";
import PaginationControls from "@/components/PaginationControls";
import Loading from "@/components/Loading";

export default function HotelsView({ name: defaultName, province: defaultProvince }: { name: string, province: string }) {
  const [name, setName] = useState(defaultName);
  const [province, setProvince] = useState(defaultProvince);;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const nameQuery = useDebounceSearch(name);

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      const res = await getHotels({ name: nameQuery, province, page, limit });
      if (!res.success) {
        console.error("Error while loading hotels:", res.message);
        return;
      }
      setHotels(res.data);
      setTotal(res.total);
      setPage(Math.min(page, Math.ceil(res.total / limit) || 1));
      setLoading(false);
      setFirstLoad(false);
    };
    loadHotels();
  }, [nameQuery, province, page, limit]);

  return (
    <main className="flex my-8 px-10 w-full xl:w-7/8 gap-8 flex-col items-center">
      <div className="flex gap-8 w-full max-w-300 items-start flex-col">
        <HotelSearch name={name} province={province} setName={setName} setProvince={setProvince} automatic />
        <div className="flex w-full gap-4 flex-col items-center">
          {hotels.length || firstLoad ? (
            <div className="flex ml-20 self-start items-center gap-12">
              <div className="text-gray-400">{(page - 1) * limit + 1} – {Math.min(page * limit, total)} of {total} results</div>
              <PaginationControls pages={Math.ceil(total / limit)} currentPage={page} limit={limit} setPage={setPage} setLimit={setLimit} />
            </div>
          ) : (
            <div className="mt-4 text-gray-400">No results found</div>
          )}
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </main>
  );
}
