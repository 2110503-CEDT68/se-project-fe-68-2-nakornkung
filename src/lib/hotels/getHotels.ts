import { PaginatedApiResponse } from "@/interface/ApiResponse";
import type Hotel from "@/interface/Hotel";
import { BACKEND_URL } from "@/lib/consts";

interface LoadHotelProps {
  name?: string;
  province?: string;
  page?: number;
  limit?: number;
}

export default async function getHotels({ name, province, page, limit }: LoadHotelProps = {}): Promise<PaginatedApiResponse<Hotel[]>> {
  try {
    const query = new URLSearchParams();
    if (name) query.set("name", name);
    if (province) query.set("province", province);
    if (page) query.set("page", page.toString());
    if (limit) query.set("limit", limit.toString());

    const res = await fetch(`${BACKEND_URL}/api/v1/hotels?${query}`, {
      cache: "no-cache",
    });

    const data: PaginatedApiResponse<Hotel[]> = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "" };
  }
}
