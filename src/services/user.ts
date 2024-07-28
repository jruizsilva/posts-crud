import { protectedInstance, publicInstance } from "../api/axiosInstances";
import {
  User,
  UserListResponse,
  UserRequest,
  UserUpdateRequest,
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

export const fetchUpdateUser = async (
  userId: number,
  userUpdateRequest: UserUpdateRequest | FormData
) => {
  const { data } = await protectedInstance.put<User>(
    `/users/${userId}`,
    userUpdateRequest
  );
  return data;
};
