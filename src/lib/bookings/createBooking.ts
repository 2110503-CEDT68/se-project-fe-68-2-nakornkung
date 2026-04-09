import Booking, { SummaryBooking } from "@/interface/Booking";
import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";

export default async function createBooking( booking: SummaryBooking, token: string ): Promise<ApiResponse<Booking>> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/hotels/${booking.hotelId}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(booking),
        });

        const result: ApiResponse<Booking> = await response.json();

        if (result.success) {
            console.log('Create Complete:', result);
        }

        return result;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log('Create booking error:', message);
        return { success: false, message };
    }
}