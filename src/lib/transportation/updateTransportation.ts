import { Transportation } from "@/interface/Transportation";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function updateTransportation(
  id: string,
  data: Partial<Transportation>, 
  token: string 
): Promise<ApiResponse<Transportation>> { 
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/transportations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null); 
      return { 
        success: false, 
        message: errorData?.message || `Request failed with status ${response.status}` 
      };
    }

    const result: ApiResponse<Transportation> = await response.json();
    return result;

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.log('Update transportation error:', message);
    return { success: false, message };
  }
}
