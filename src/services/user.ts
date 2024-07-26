import { protectedInstance, publicInstance } from "../api/axiosInstances";
import { User, UserRequest } from "../types/user";

export const fetchUserList = async () => {
  const { data } = await protectedInstance.get<User[]>("/users");
  return data;
};

export const fetchCreateUser = async (user: UserRequest) => {
  const { data } = await publicInstance.post<User>("/users", user);
  return data;
};
