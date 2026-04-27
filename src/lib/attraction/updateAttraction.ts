import { Attraction } from "@/interface/Attraction"
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function updateAttraction(
  id: string,
  attraction: Partial<Omit<Attraction, "_id" | "createdAt">>,
  token: string
): Promise<ApiResponse<Attraction>> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/attractions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(attraction),
    });

    const result: ApiResponse<Attraction> = await response.json();

    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log("Update attraction error:", message);
    return { success: false, message };
  }
}