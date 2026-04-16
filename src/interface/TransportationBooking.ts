import Booking from "@/interface/Booking";
import { Transportation } from "@/interface/Transportation";
import { User } from "@/interface/User";

export interface TransportationBooking {
  _id: string;
  user: User
  booking: Booking;
  transportation: Transportation;
  departureDateTime: string;
  passengerNumber: number;
  returnDateTime: string;
  bookingDate: string;
}

export interface TransportBookingInfo {
  transport: Transportation;
  departure: string;
  passengerNumber: string;
}
