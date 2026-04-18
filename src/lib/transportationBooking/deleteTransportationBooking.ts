import { ApiResponse } from "@/interface/ApiResponse";
import { BACKEND_URL } from "@/lib/consts";

export default async function deleteTransportationBooking(
  token: string,
  bookingId: string
): Promise<ApiResponse<{}>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/transportationbookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<{}> = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }

    return { success: false, message: "Failed to delete transportation booking" };
  }
}
