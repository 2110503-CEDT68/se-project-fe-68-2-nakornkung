import { Attraction } from "@/interface/Attraction";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function createAttraction(
  attractionData: Omit<Attraction, "_id" | "createdAt">,
  token: string
): Promise<ApiResponse<Attraction>> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/attractions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(attractionData),
    });

    const result: ApiResponse<Attraction> = await response.json();

    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log("Create attraction error:", message);
    return { success: false, message };
  }
}