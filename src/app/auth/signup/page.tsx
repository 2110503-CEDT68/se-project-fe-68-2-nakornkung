"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import register from "@/lib/user/register";
import Link from "next/link";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl)
    }
  }, [status, callbackUrl, router]);

  const handleSubmit = async () => {
    setEmailError(null);
    const res = await register({ name, email, tel, password });
    if (!res.success) {
      setEmailError(res.message);
      return;
    }
    await signIn("credentials", { email, password, callbackUrl });
    setPassword("");
  };

  return (
    <main className="my-20 px-10 w-3xl max-w-full">
      <form className="flex px-10 lg:px-20 py-10 gap-6 flex-col items-stretch rounded-2xl shadow-lg border border-secondary-gray bg-white dark:bg-dark-secondary dark:border-none" action={handleSubmit}>
        <h1 className="self-center text-3xl font-black dark:text-white">Sign up</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="signup-name" className="text-lg dark:text-white">Name <span className="text-red-400">*</span></label>
          <input
            id="signup-name"
            name="name"
            type="text"
            className="p-3 rounded-2xl border border-secondary-gray bg-secondary-gray 
            focus:shadow-[0_0_15px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.05)]  
            focus:outline-none text-text-3
            focus:bg-white
            dark:bg-dark-secondary-0 dark:border-none dark:focus:bg-dark-secondary-1 dark:text-white dark:placeholder:text-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="signup-email" className="text-lg dark:text-white">E-Mail <span className="text-red-400">*</span></label>
          <input
            id="signup-email"
            name="email"
            type="email"
            className={`p-3 rounded-2xl border bg-secondary-gray ${!emailError ? "border-secondary-gray dark:border-none" : "border-red-500"}
            focus:shadow-[0_0_15px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.05)]  
            focus:outline-none text-text-3
            focus:bg-white
            dark:bg-dark-secondary-0 dark:focus:bg-dark-secondary-1  dark:text-white dark:placeholder:text-gray-300`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {emailError && (
            <div className="mt-2 text-red-500">
              {emailError}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="signup-tel" className="text-lg dark:text-white">Telephone No. <span className="text-red-400">*</span></label>
          <input
            id="signup-tel"
            name="tel"
            type="tel"
            className="p-3 rounded-2xl border border-secondary-gray bg-secondary-gray 
            focus:shadow-[0_0_15px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.05)]  
            focus:outline-none text-text-3
            focus:bg-white
            dark:bg-dark-secondary-0 dark:border-none dark:focus:bg-dark-secondary-1 dark:text-white dark:placeholder:text-gray-300"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="Tel. #"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="signup-password" className="text-lg dark:text-white">Password <span className="text-red-400">*</span></label>
          <input
            id="signup-password"
            name="password"
            type="password"
            className="p-3 rounded-2xl border border-secondary-gray bg-secondary-gray 
            focus:shadow-[0_0_15px_rgba(0,0,0,0.08),0_0_40px_rgba(0,0,0,0.05)]  
            focus:outline-none text-text-3
            focus:bg-white
            dark:bg-dark-secondary-0 dark:border-none dark:focus:bg-dark-secondary-1 dark:text-white dark:placeholder:text-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength={6}
            required
          />
        </div>
        <div />
        <div className="flex gap-2">
          <input
            id="privacy-policy-agree"
            type="checkbox"
            required
          />
          <label>I have read and agree to the <Link className="text-blue-600 dark:text-blue-500 underline" href="/privacy-policy" target="_blank">privacy policy</Link></label>
        </div>
        <button className="py-4 rounded-full bg-primary hover:bg-accent cursor-pointer font-bold text-white text-lg dark:bg-dark-primary dark:hover:bg-dark-primary-0">
          Sign up
        </button>
        <div className="flex mt-2 gap-1 flex-col space-y-2">
          <p className="text-sm font-normal text-text-3 dark:text-gray-200">{"Already have an account?"}</p>
          <button onClick={() => signIn(undefined, { callbackUrl })} 
          className="py-4 w-full font-bold text-center text-primary text-lg rounded-full border border-accent cursor-pointer hover:bg-secondary-gray
          dark:border-none dark:bg-dark-secondary-0 dark:hover:bg-dark-secondary-1 dark:text-white dark:placeholder:text-gray-300">
            Log in
          </button>
        </div>
      </form>
    </main>
  );
}
