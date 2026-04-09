import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { UserRole } from "@/interface/User";

type SessionState = [true, Session] | [false, Session | null] | [null, null];

export default function useUserFilter(role: UserRole | null = null, redirect: string = "/"): SessionState {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated" && role && session.user.role !== role) {
      router.push(redirect);
    }
  }, [status, session, router, role, redirect]);

  if (status === "authenticated") return [!role || session.user.role === role, session]
  if (status === "unauthenticated") return [false, null];
  return [null, null]
}
