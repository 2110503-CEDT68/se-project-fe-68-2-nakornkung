import { Attraction } from "./Attraction";

export default interface Hotel {
  _id: string;
  name: string;
  address: string;
  tel: string;
  district: string;
  province: string;
  postalcode: string;
  img: string;
  attraction?: Attraction[];
}