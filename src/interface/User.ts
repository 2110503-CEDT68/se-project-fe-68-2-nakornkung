export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  name: string;
  tel: string;
  email: string;
  role: UserRole;
};

export interface SessionUser {
  id: string;
  name: string;
  role: UserRole;
  token: string;
}
