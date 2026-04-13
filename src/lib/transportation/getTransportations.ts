import { PaginatedApiResponse } from "@/interface/ApiResponse";
import type { Transportation, TransportationType } from "@/interface/Transportation";
import { BACKEND_URL } from "@/lib/consts";

interface LoadTransportationProps {
  name?: string;
  providerName?: string;
  type?: TransportationType | "";
  province?: string;
  page?: number;
  limit?: number;
}

export default async function getTransportations(token: string, { name, providerName, type, province, page, limit }: LoadTransportationProps = {}): Promise<PaginatedApiResponse<Transportation[]>> {
  try {
    const query = new URLSearchParams();
    if (name) query.set("name", name);
    if (providerName) query.set("providerName", providerName);
    if (type) query.set("type", type);
    if (province) query.set("province", province);
    if (page) query.set("page", page.toString());
    if (limit) query.set("limit", limit.toString());

    const res = await fetch(`${BACKEND_URL}/api/v1/transportations?${query}`, {
      cache: "no-cache",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: PaginatedApiResponse<Transportation[]> = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "" };
  }
}
