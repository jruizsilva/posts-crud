import { protectedInstance, publicInstance } from "../api/axiosInstances";
import {
  UserEditRequest,
  User,
  UserListResponse,
  UserRequest,
} from "../types/user";

export const fetchUserListPagination = async (locationSearch: string) => {
  let queryString = locationSearch.startsWith("?")
    ? locationSearch
    : `?${locationSearch}`;

  if (!queryString.includes("page=")) {
    queryString += queryString === "?" ? "page=1" : "&page=1";
  }
  const { data } = await protectedInstance.get<UserListResponse>(
    `/users${queryString}`
  );
  return data;
};

export const fetchCreateUser = async (user: UserRequest) => {
  const { data } = await publicInstance.post<User>("/users", user);
  return data;
};

export const fetchEditUser = async (
  userId: number,
  userEditRequest: UserEditRequest
) => {
  const { data } = await protectedInstance.put<User>(
    `/users/${userId}`,
    userEditRequest
  );
  return data;
};
