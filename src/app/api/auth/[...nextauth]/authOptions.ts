import { SessionUser } from "@/interface/User";
import login from "@/lib/user/login";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsProvider = CredentialsProvider({
  name: "Email",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    if (!credentials) return null;
    const res = await login(credentials);
    if (!res.success) return null;
    const { data } = res;
    return data;
  }
});

export const authOptions: AuthOptions = {
  providers: [credentialsProvider],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      session.user = token as unknown as SessionUser;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  }
};
