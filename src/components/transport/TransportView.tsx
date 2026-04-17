"use client";

import { useEffect, useState } from "react";
import TransportSearch from "./TransportSearch";
import TransportCard from "./TransportCard";
import getTransportations from "@/lib/transportation/getTransportations";
import { useDebounceSearch } from "@/util/useDebounceSearch";
import type { Transportation ,TransportationType} from "@/interface/Transportation";
import PaginationControls from "@/components/PaginationControls";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";

export default function TransportView({ name: defaultName, provider: defaultProvider, type: defaultType, province: defaultProvince }: { name: string, provider: string, type: TransportationType, province: string }) {
  const { data: session } = useSession();
  const [name, setName] = useState(defaultName);
  const [province, setProvince] = useState(defaultProvince);
  const [provider, setProvider] = useState(defaultProvider);
  const [type, setType] = useState<TransportationType | "">(defaultType);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [transportations, setTransportations] = useState<Transportation[]>([]);

  const nameQuery = useDebounceSearch(name);

  

  useEffect(() => {
    if (!session) return;
    const loadTransportations = async () => {
      setLoading(true);
      const res = await getTransportations(session.user.token, { name: nameQuery, providerName: provider, type, province, page, limit });
      if (!res.success) {
        console.error("Error while loading transportations:", res.message);
        return;
      }
      setTransportations(res.data);
      setTotal(res.total);
      setPage(Math.min(page, Math.ceil(res.total / limit) || 1));
      setLoading(false);
      setFirstLoad(false);
    };
    loadTransportations();
  }, [session, nameQuery, provider, type, province, page, limit]);

  return (
    <main className="flex my-8 px-10 w-full xl:w-7/8 gap-8 flex-col items-center">
      <div className="flex gap-8 w-full max-w-300 items-start flex-col">
        <TransportSearch name={name} provider={provider} type={type} province={province} setName={setName} setProvider={setProvider} setType={setType} setProvince={setProvince} automatic />
        <div className="flex w-full gap-4 flex-col items-center">
          {transportations.length || firstLoad ? (
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
          {transportations.map((transport) => (
            <TransportCard key={transport._id} transport={transport} 
            onDelete={(id) => console.log("Deleting:", id)}
            onEdit={(id) => console.log("Updating:", id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
