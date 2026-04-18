import { ApiResponse } from "@/interface/ApiResponse";
import type { TransportationBooking } from "@/interface/TransportationBooking";
import { BACKEND_URL } from "@/lib/consts";

interface UpdateTransportationBookingProps {
  departureDateTime: string;
  returnDateTime: string;
  passengerNumber: number;
}

export default async function updateTransportationBooking(
  token: string,
  bookingId: string,
  body: UpdateTransportationBookingProps
): Promise<ApiResponse<TransportationBooking>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/transportationbookings/${bookingId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data: ApiResponse<TransportationBooking> = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }

    return { success: false, message: "Failed to update transportation booking" };
  }
}
