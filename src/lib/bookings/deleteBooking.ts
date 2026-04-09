import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function deleteBooking(id: string, token: string): Promise<ApiResponse<never>> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const result: ApiResponse<never> = await response.json();

    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.log('Update booking error:', message);
    return { success: false, message };
  }
}
