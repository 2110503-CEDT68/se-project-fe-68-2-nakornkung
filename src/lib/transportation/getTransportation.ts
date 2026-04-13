import { ApiResponse } from "@/interface/ApiResponse";
import type { Transportation } from "@/interface/Transportation";
import { BACKEND_URL } from "@/lib/consts";

export default async function getTransportation(transportationId: string): Promise<ApiResponse<Transportation>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/transportations/${transportationId}`);

    const data: ApiResponse<Transportation> = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "" };
  }
}
