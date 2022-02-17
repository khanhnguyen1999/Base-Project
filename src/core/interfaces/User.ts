export type Role = "admin" | "company";

export interface User {
  id?: string;
  username?: string;
  password?: string;
  role?: Role;
}
