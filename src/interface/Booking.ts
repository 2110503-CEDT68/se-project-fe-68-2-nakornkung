import Hotel from "@/interface/Hotel";
import { User } from "@/interface/User";

export default interface Booking {
  _id: string;
  hotel: Hotel;
  user: User;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  bookingDate: string;
}

export interface SummaryBooking {
  hotelId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  bookingDate: string;
}
