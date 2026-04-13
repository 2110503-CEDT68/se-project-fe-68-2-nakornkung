"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDebounceSearch } from "@/util/useDebounceSearch";
import PaginationControls from "@/components/PaginationControls";
import Loading from "@/components/Loading";
import { TransportationType, type Transportation } from "@/interface/Transportation";
import TransportSearch from "@/components/transport/TransportSearch";
import getTransportations from "@/lib/transportation/getTransportations";
import TransportCard from "@/components/transport/TransportCard";
import deleteTransportation from "@/lib/transportation/deleteTransportation";
import Link from "next/link";

export default function ManageTransportPanel() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [transportType, setTransportType] = useState<TransportationType | "">("");
  const [province, setProvince] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [transports, setTransports] = useState<Transportation[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const nameQuery = useDebounceSearch(name);
  const providerQuery = useDebounceSearch(provider);

  useEffect(() => {
    if (!session?.user.token) return;
    const loadTransportations = async () => {
      setLoading(true);
      const res = await getTransportations(session.user.token, { name: nameQuery, providerName: providerQuery, type: transportType, province, page, limit });
      if (!res.success) {
        console.error("Error while loading transportations:", res.message);
        return;
      }
      setTransports(res.data);
      setTotal(res.total);
      setPage(Math.min(page, Math.ceil(res.total / limit) || 1));
      setLoading(false);
      setFirstLoad(false);
    };
    loadTransportations();
  }, [session, nameQuery, providerQuery, transportType, province, page, limit]);

  const handleDelete = async (id: string) => {
    if (!session?.user.token) return;
    try {
      await deleteTransportation(id, session?.user.token);
    } catch (err) {
      console.error("Error while deleting transportation:", err)
    }
  };

  if (!session) {
    return <Loading />
  }

  return (
    <div className="flex m-4 w-full gap-8 flex-col items-center">
      <Link href="/admin/transport/new" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-dark-primary">
        Create transportation
      </Link>
      <div className="flex gap-8 w-full max-w-300 items-center flex-col">
        <TransportSearch name={name} provider={provider} type={transportType} province={province} setName={setName} setProvider={setProvider} setType={setTransportType} setProvince={setProvince} />
        <div className="flex w-full gap-4 flex-col items-center">
          {transports.length || firstLoad ? (
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
        <div className="flex w-full gap-4 flex-col">
          {transports.map((transport) => (
            <TransportCard key={transport._id} transport={transport} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
