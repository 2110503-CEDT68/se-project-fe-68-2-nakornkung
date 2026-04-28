interface Address {
  street: string;
  district: string;
  province: string;
  postalCode: string;
}

export interface Location {
  name: string;
  address: Address;
}

export const transportationTypes = ["car", "airplane", "boat", "bus", "van", "shuttle"] as const;
export type TransportationType = typeof transportationTypes[number];

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
  active: boolean;
  createAt: string;
}
