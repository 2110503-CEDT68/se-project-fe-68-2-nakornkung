import { PaginatedApiResponse } from "@/interface/ApiResponse";
import type Booking from "@/interface/Booking";
import { BACKEND_URL } from "@/lib/consts";

interface LoadBookingProps {
  page?: number;
  limit?: number;
}

export default async function getBookings(token: string, { page, limit }: LoadBookingProps = {}): Promise<PaginatedApiResponse<Booking[]>> {
  try {
    const query = new URLSearchParams();
    if (page) query.set("page", page.toString());
    if (limit) query.set("limit", limit.toString());

    const res = await fetch(`${BACKEND_URL}/api/v1/bookings?${query}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const data: PaginatedApiResponse<Booking[]> = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }

    return { success: false, message: "Failed to load bookings" };
  }
}
