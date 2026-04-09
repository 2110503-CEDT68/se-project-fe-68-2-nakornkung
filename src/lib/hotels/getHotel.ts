import { ApiResponse } from "@/interface/ApiResponse";
import type Hotel from "@/interface/Hotel";
import { BACKEND_URL } from "@/lib/consts";

export default async function getHotel(hotelId: string): Promise<ApiResponse<Hotel>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/hotels/${hotelId}`);

    const data: ApiResponse<Hotel> = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "" };
  }
}
