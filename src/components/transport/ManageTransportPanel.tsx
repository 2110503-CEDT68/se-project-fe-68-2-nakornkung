"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDebounceSearch } from "@/util/useDebounceSearch";
import PaginationControls from "@/components/PaginationControls";
import Loading from "@/components/Loading";
import { Transportation, TransportationType } from "@/interface/Transportation";
import TransportSearch from "@/components/transport/TransportSearch";
import getTransportations from "@/lib/transportation/getTransportations";
import TransportCard from "@/components/transport/TransportCard";
import deleteTransportation from "@/lib/transportation/deleteTransportation";
import updateTransportation from "@/lib/transportation/updateTransportation";
import Link from "next/link";

const getFriendlyErrorMessage = (message?: string) => {
  if (!message) return "Something went wrong.";

  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("duplicate") ||
    normalizedMessage.includes("already exists") ||
    normalizedMessage.includes("e11000")
  ) {
    return "A transportation with this name already exists. Please choose a different name.";
  }

  return message;
};

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

  const loadTransportations = useCallback(async () => {
    if (!session?.user.token) return;

    setLoading(true);
    const res = await getTransportations(session.user.token, {
      name: nameQuery,
      providerName: providerQuery,
      type: transportType,
      province,
      page,
      limit,
    });

    if (!res.success) {
      console.error("Error while loading transportations:", res.message);
      setLoading(false);
      return;
    }

    setTransports(res.data);
    setTotal(res.total);
    setPage((currentPage) => Math.min(currentPage, Math.ceil(res.total / limit) || 1));
    setLoading(false);
    setFirstLoad(false);
  }, [session, nameQuery, providerQuery, transportType, province, page, limit]);

  useEffect(() => {
    loadTransportations();
  }, [loadTransportations]);

  const handleDelete = async (id: string) => {
    if (!session?.user.token) return;

    try {
      const res = await deleteTransportation(id, session.user.token);

      if (!res.success) {
        alert(`Delete failed: ${res.message}`);
        return;
      }

      setTransports((prev) => prev.filter((transport) => transport._id !== id));
      setTotal((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Error while deleting transportation:", err);
      alert("Something went wrong while deleting transportation.");
    }
  };

  const handleEdit = async (transportId: string, formData: Partial<Transportation>) => {
    if (!session?.user.token) return;

    try {
      const res = await updateTransportation(transportId, formData, session.user.token);
      if (!res.success) {
        throw new Error(getFriendlyErrorMessage(res.message));
      }

      await loadTransportations();
    } catch (error) {
      console.error("Error updating transportation:", error);
      alert(error instanceof Error ? error.message : "Failed to update transportation");
      throw error;
    }
  };

  if (!session) {
    return <Loading />;
  }

  return (
    <div className="flex m-4 w-full gap-8 flex-col items-center">
      <Link href="/admin/transport/new" className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-dark-primary">
        Create transportation
      </Link>

      <div className="flex gap-8 w-full max-w-300 items-center flex-col">
        <TransportSearch
          name={name}
          provider={provider}
          type={transportType}
          province={province}
          setName={setName}
          setProvider={setProvider}
          setType={setTransportType}
          setProvince={setProvince}
        />

        <div className="flex w-full gap-4 flex-col items-center">
          {transports.length || firstLoad ? (
            <div className="flex ml-20 self-start items-center gap-12">
              <div className="text-gray-400">
                {(page - 1) * limit + 1} – {Math.min(page * limit, total)} of {total} results
              </div>
              <PaginationControls
                pages={Math.ceil(total / limit)}
                currentPage={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
              />
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
            <TransportCard
              key={transport._id}
              transport={transport}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}