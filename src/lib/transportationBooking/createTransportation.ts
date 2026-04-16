import { BACKEND_URL } from "../consts";
import { ApiResponse } from "@/interface/ApiResponse";
import { TransportationBooking, TransportBookingInfo } from "@/interface/TransportationBooking";

export default async function createTransportationBooking( bookingId: string, transportBooking: TransportBookingInfo, token: string ): Promise<ApiResponse<TransportationBooking>> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/transportations/${transportBooking.transport._id}/transportationBookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                booking: bookingId,
                departureDateTime: new Date(transportBooking.departure).toISOString(),
                passengerNumber: Number(transportBooking.passengerNumber),
            }),
        });

        const result: ApiResponse<TransportationBooking> = await response.json();

        if (result.success) {
            console.log('Create Complete:', result);
        }

        return result;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log('Create transportation booking error:', message);
        return { success: false, message };
    }
}