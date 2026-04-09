import { ApiResponse } from "@/interface/ApiResponse";
import { User } from "@/interface/User";
import { BACKEND_URL } from "@/lib/consts";

export default async function getMe(token: string): Promise<ApiResponse<User>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    const data: ApiResponse<User> = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "" };
  }
}
