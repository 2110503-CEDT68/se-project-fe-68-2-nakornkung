import Booking, { SummaryBooking } from "@/interface/Booking";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function updateBooking(id: string, booking: Pick<SummaryBooking, "checkInDate" | "checkOutDate">, token: string): Promise<ApiResponse<Booking>> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(booking),
    });

    const result: ApiResponse<Booking> = await response.json();

    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.log('Update booking error:', message);
    return { success: false, message };
  }
}
