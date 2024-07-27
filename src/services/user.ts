import { protectedInstance, publicInstance } from "../api/axiosInstances";
import { User, UserListResponse, UserRequest } from "../types/user";

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
