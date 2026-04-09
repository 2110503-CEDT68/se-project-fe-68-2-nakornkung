import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import NavBar from "@/components/navbar/NavBar";
import ClientWrapper from "@/app/ClientWrapper";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PratuNa Hotel Booking",
  description: "Hotel Booking Service by PratuNa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body className="flex pb-20 min-h-full w-full flex-col items-center dark:bg-dark-bg">
        <ClientWrapper session={session}>
          <NavBar initialAuthenticated={Boolean(session)} />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
