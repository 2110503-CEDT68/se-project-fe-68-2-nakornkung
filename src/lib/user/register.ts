import { ApiResponse } from "@/interface/ApiResponse";
import { SessionUser } from "@/interface/User";
import { BACKEND_URL } from "@/lib/consts";

export interface RegisterParams {
  name: string;
  email: string;
  tel: string;
  password: string;
}

export default async function register({ name, email, tel, password }: RegisterParams): Promise<ApiResponse<SessionUser>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        tel,
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
