import Hotel from "@/interface/Hotel";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function addAttractionToHotel(
  hotelId: string,
  attractionId: string,
  token: string
): Promise<ApiResponse<Hotel>> {
  try {
    // First fetch the hotel to get the current attraction array
    const hotelRes = await fetch(`${BACKEND_URL}/api/v1/hotels/${hotelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const hotelData: ApiResponse<Hotel> = await hotelRes.json();

    if (!hotelData.success) {
      return { success: false, message: hotelData.message ?? "Failed to fetch hotel" };
    }

    const existingIds: string[] = (hotelData.data.attraction ?? []).map(
      (a: any) => {
        if (typeof a === "string") return a;
        if (typeof a?._id === "string") return a._id;
        return String(a?._id ?? a); // handles Mongoose ObjectId objects
      }
    ).filter(Boolean);

    const updatedIds = [...existingIds, attractionId];

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
    console.log("Add attraction to hotel error:", message);
    return { success: false, message };
  }
}