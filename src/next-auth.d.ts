import "next-auth";
import { SessionUser } from "@/interface/User";

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}
