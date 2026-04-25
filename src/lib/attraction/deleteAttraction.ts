import { BACKEND_URL } from "../consts";

export default async function deleteAttraction(id: string, token: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/attractions/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete attraction",
    };
  }
}