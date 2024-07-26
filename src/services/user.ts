import { protectedInstance } from "../api/axiosInstances";
import { User, UserRequest } from "../types/user";

export const fetchUserList = async () => {
  const { data } = await protectedInstance.get<User[]>("/users");
  return data;
};

export const fetchCreateUser = async (user: UserRequest) => {
  const { data } = await protectedInstance.post<User>("/users", user);
  return data;
};
