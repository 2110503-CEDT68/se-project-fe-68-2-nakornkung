"use client";

import { ReactNode } from "react";
import useUserFilter from "@/util/useUserFilter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [allowed] = useUserFilter("admin");
  if (!allowed) return <></>;

  return (
    <>
      {children}
    </>
  );
}
