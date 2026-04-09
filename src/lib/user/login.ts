import { ApiResponse } from "@/interface/ApiResponse";
import { SessionUser } from "@/interface/User";
import { BACKEND_URL } from "@/lib/consts";

export interface LoginParams {
  email: string;
  password: string;
}

export default async function login({ email, password }: LoginParams): Promise<ApiResponse<SessionUser>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: ApiResponse<SessionUser> = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "" };
  }
}
