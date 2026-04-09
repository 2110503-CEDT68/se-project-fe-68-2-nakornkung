"use client";

import { ReactNode, Suspense } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ClientWrapperProps {
  children: ReactNode;
  session?: Session | null;
}

export default function ClientWrapper({ children, session }: ClientWrapperProps) {
  return (
    <SessionProvider session={session}>
      <Suspense>
        {children}
      </Suspense>
    </SessionProvider>
  );
}
