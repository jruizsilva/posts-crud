import { User } from "./user";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}
export type { LoginRequest, LoginResponse };
