import { Transportation } from "@/interface/Transportation";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function createTransportation( transportation: Omit<Transportation, "_id" | "createAt">, token: string ): Promise<ApiResponse<Transportation>> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/transportations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transportation),
        });

        const result: ApiResponse<Transportation> = await response.json();

        if (result.success) {
            console.log('Create Complete:', result);
        }

        return result;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log('Create transportation error:', message);
        return { success: false, message };
    }
}