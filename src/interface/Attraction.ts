export type AttractionCategory =
| "museum" | "restaurant" | "landmark"
| "nature" | "activity" | "temple"
| "park" | "other";
export interface OpeningHour {
open: "HH:MM"; // e.g. "09:00"
close: "HH:MM";
}
export interface AttractionAddress {
street?: string;
district: string;
province: string;
postalCode?: string;
}
export interface Attraction {
_id: string;
name: string;
description?: string;
category: AttractionCategory;
address: AttractionAddress;
location: { type: "Point"; coordinates: [number, number] };
openingHours?: Record<string, OpeningHour>;
img: string;
createdAt: string;
}