"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import NavBarItem from "./NavBarItem";

interface NavBarProps {
  initialAuthenticated?: boolean;
}

export default function NavBar({ initialAuthenticated = false }: NavBarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "loading"
    ? initialAuthenticated
    : status === "authenticated";

  const authDisabled = pathname.startsWith("/auth");

  const handleSignIn = () => {
    if (authDisabled) return;
    signIn();
  };

  const handleSignOut = () => {
    if (authDisabled) return;
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-800 w-full h-20 px-6 py-4 bg-background shadow-md dark:bg-dark-secondary">
      <nav className="flex w-full h-full gap-8 items-stretch text-background">
        <NavBarItem>
          <Link href="/" className="relative h-full aspect-square">
            <Image
              className="bg-transparent!"
              src="/logo.png"
              alt="Logo"
              loading="eager"
              sizes="64px"
              fill
            />
          </Link>
        </NavBarItem>
        {session && (
          <NavBarItem>
            <div className="text-lg font-medium no-underline">
              Logged in as: {session.user.name}
            </div>
          </NavBarItem>
        )}
        <div className="grow" />
        {session?.user.role === "admin" && (
          <NavBarItem><Link href="/admin">Admin</Link></NavBarItem>
        )}
        <NavBarItem><Link href="/transportations">Transportations</Link></NavBarItem>
        <NavBarItem><Link href="/hotels">Hotels</Link></NavBarItem>
        <NavBarItem><Link href="/booking">Booking</Link></NavBarItem>
        {
          !isAuthenticated ? (
            <NavBarItem onClick={handleSignIn} disabled={authDisabled}>Login</NavBarItem>
          ) : (
            <NavBarItem onClick={handleSignOut} disabled={authDisabled}>Logout</NavBarItem>
          )
        }
      </nav>
    </header>
  );
}
