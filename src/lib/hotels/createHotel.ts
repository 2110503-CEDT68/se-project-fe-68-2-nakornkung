import { ApiResponse } from "@/interface/ApiResponse";
import Hotel from "@/interface/Hotel";
import { BACKEND_URL } from "@/lib/consts";

export default async function createHotel(hotel: Omit<Hotel, "_id">, token: string): Promise<ApiResponse<Hotel>> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/hotels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(hotel),
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('Create Complete:', result);
        }
        return result;
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, message: err.message };
        }
        return { success: false, message: "" };
    }
}