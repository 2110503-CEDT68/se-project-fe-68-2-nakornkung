import { ApiResponse } from "@/interface/ApiResponse";
import type { TransportationBooking } from "@/interface/TransportationBooking";
import { BACKEND_URL } from "@/lib/consts";

export default async function getTransportationBookings(
  token: string
): Promise<ApiResponse<TransportationBooking[]>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/transportationbookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const data: ApiResponse<TransportationBooking[]> = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }

    return { success: false, message: "Failed to load transportation bookings" };
  }
}