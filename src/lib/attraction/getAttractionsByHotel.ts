import { BACKEND_URL } from "../consts";
import { Attraction } from "@/interface/Attraction";
import { GetAttractionsResponse } from "./getAttractions";

export default async function getAttractionsByHotel(
  hotelId: string
): Promise<GetAttractionsResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/hotels/${hotelId}`, {
      cache: "no-store",
    });
    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        count: 0,
        total: 0,
        pagination: {},
        data: [],
        message: data.message ?? "Failed to fetch hotel",
      };
    }

    const raw: any[] = data.data?.attraction ?? [];

    if (raw.length === 0) {
      return { success: true, count: 0, total: 0, pagination: {}, data: [] };
    }

    // Check if attractions are populated objects or raw ID strings
    const isPopulated = typeof raw[0] === "object" && raw[0]?._id;

    let attractions: Attraction[];

    if (isPopulated) {
      // Backend populates — use directly
      attractions = raw.filter((a) => !!a._id) as Attraction[];
    } else {
      // Backend returns raw ObjectId strings — fetch each individually
      const results = await Promise.all(
        raw
          .map((a) => (typeof a === "string" ? a : String(a)))
          .filter(Boolean)
          .map((id) =>
            fetch(`${BACKEND_URL}/api/v1/attractions/${id}`, {
              cache: "no-store",
            })
              .then((r) => r.json())
              .then((r) => (r.success ? (r.data as Attraction) : null))
              .catch(() => null)
          )
      );
      attractions = results.filter((a): a is Attraction => a !== null);
    }

    return {
      success: true,
      count: attractions.length,
      total: attractions.length,
      pagination: {},
      data: attractions,
    };
  } catch (error) {
    return {
      success: false,
      count: 0,
      total: 0,
      pagination: {},
      data: [],
      message:
        error instanceof Error ? error.message : "Failed to fetch attractions",
    };
  }
}