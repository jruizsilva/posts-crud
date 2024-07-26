import { protectedInstance, publicInstance } from "../api/axiosInstances";
import { LoginRequest, LoginResponse } from "../types/auth";
import { User } from "../types/user";

export const fetchLogin = async (loginRequest: LoginRequest) => {
  const { data } = await publicInstance.post<LoginResponse>(
    "/login",
    loginRequest
  );
  return data;
};

export const fetchMe = async () => {
  const { data } = await protectedInstance.get<User>("/me");
  return data;
};

export const fetchLogout = async () => {
  await protectedInstance.post("/logout");
};
