"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { status } = useSession();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error") ?? null;

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl)
    }
  }, [status, callbackUrl, router]);

  const handleSubmit = async () => {
    await signIn("credentials", { email, password, callbackUrl });
    setPassword("");
  };

  return (
    <main className="my-20 px-10 w-3xl max-w-full">
      <form className="flex px-10 lg:px-20 py-10 gap-6 flex-col items-stretch rounded-2xl shadow-lg border border-secondary-gray bg-white dark:bg-dark-secondary dark:border-none" action={handleSubmit}>
        <h1 className="self-center text-3xl font-extrabold text-text-1 dark:text-white">Login</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="login-email" className="text-lg font-bold text-text-2 dark:text-white">E-Mail <span className="text-red-400">*</span></label>
          <input
            id="login-email"
            name="email"
            type="email"
            className={`p-3 rounded-2xl border bg-secondary-gray ${!error ? "border-secondary-gray dark:border-none" : "border-red-500"}
            focus:shadow-[0_0_15px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.05)]  
            focus:outline-none text-text-3
            focus:bg-white
            dark:bg-dark-secondary-0 dark:focus:bg-dark-secondary-1 dark:text-white dark:placeholder:text-gray-300`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="login-password" className="text-lg font-bold text-text-2 focus:outline-none dark:text-white">Password <span className="text-red-400">*</span></label>
          <input
            id="login-password"
            name="password"
            type="password"
            className={`p-3 rounded-2xl border bg-secondary-gray ${!error ? "border-secondary-gray dark:border-none" : "border-red-500"}
            focus:shadow-[0_0_15px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.05)]  
            focus:outline-none text-text-3
            focus:bg-white
            dark:bg-dark-secondary-0 dark:focus:bg-dark-secondary-1 dark:text-white dark:placeholder:text-gray-300 `}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className={`text-red-500 ${error ? "visible" : "invisible"}`}>
          Invalid email or password
        </div>
        <button className="mt-8 py-4 rounded-full bg-primary hover:bg-accent cursor-pointer font-bold text-white text-lg dark:bg-dark-primary dark:hover:bg-dark-primary-0">
          Log in
        </button>
        <div className="flex mt-2 gap-1 flex-col space-y-2">
          <p className="text-sm font-normal text-gray-200">{"Don't have an account?"}</p>
          <Link href={{ pathname: "/auth/signup", query: { callbackUrl } }} className="py-4 w-full font-bold text-center text-primary text-lg rounded-full border border-accent cursor-pointer hover:bg-secondary-gray 
          dark:border-none dark:bg-dark-secondary-0 dark:text-white dark:hover:bg-dark-secondary-1">Sign up
          </Link>
        </div>
      </form>
    </main>
  );
}
