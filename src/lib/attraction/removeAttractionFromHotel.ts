import Hotel from "@/interface/Hotel";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function removeAttractionFromHotel(
  hotelId: string,
  attractionId: string,
  token: string
): Promise<ApiResponse<Hotel>> {
  try {
    const hotelRes = await fetch(`${BACKEND_URL}/api/v1/hotels/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const hotelData: ApiResponse<Hotel> = await hotelRes.json();

    if (!hotelData.success) {
      return { success: false, message: hotelData.message ?? "Failed to fetch hotel" };
    }

    const updatedIds: string[] = (hotelData.data.attraction ?? [])
      .map((a: any) => {
        if (typeof a === "string") return a;
        if (typeof a?._id === "string") return a._id;
        return String(a?._id ?? a);
      })
      .filter((id: string) => Boolean(id) && id !== attractionId);

    const updateRes = await fetch(`${BACKEND_URL}/api/v1/hotels/${hotelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ attraction: updatedIds }),
    });

    const result: ApiResponse<Hotel> = await updateRes.json();
    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log("Remove attraction from hotel error:", message);
    return { success: false, message };
  }
}