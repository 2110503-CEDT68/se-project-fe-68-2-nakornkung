import { BACKEND_URL } from "../consts";
import { Attraction, AttractionCategory } from "@/interface/Attraction";

export type { Attraction, AttractionCategory };

export interface GetAttractionsResponse {
  success: boolean;
  count: number;
  total: number;
  pagination: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
  data: Attraction[];
  message?: string;
}

export interface GetAttractionsParams {
  name?: string;
  category?: AttractionCategory;
  select?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export default async function getAttractions(
  params?: GetAttractionsParams
): Promise<GetAttractionsResponse> {
  try {
    const query = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }

    const url = `${BACKEND_URL}/api/v1/attractions${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    const response = await fetch(url);

    const data = await response.json();
    return data;
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