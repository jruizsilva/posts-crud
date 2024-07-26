import { protectedInstance } from "../api/axiosInstances";
import { User } from "../types/user";

export const getUserList = async () => {
  const { data } = await protectedInstance.get<User[]>("/users");
  return data;
};
