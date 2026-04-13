interface Address {
  street: string;
  district: string;
  province: string;
  postalCode: string;
}

interface Location {
  name: string;
  address: Address;
}

export type TransportationType = "car" | "airplane" | "boat" | "bus" | "van" | "shuttle";

export interface Transportation {
  _id: string;
  name: string;
  description: string | null;
  type: TransportationType;
  providerName: string;
  pickUpArea: Location;
  dropOffArea: Location;
  price: number;
  img: string;
  createAt: string;
}
