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
  userUpdateRequest: UserUpdateRequest
) => {
  console.log(userUpdateRequest);
  const { data } = await protectedInstance.put<User>(
    `/users/${userId}`,
    userUpdateRequest
  );
  return data;
};

export const fetchUploadUserPhoto = async (formData: FormData) => {
  const { data } = await protectedInstance.post<User>(
    `/me/uploadImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const fetchDeleteImageUploaded = async () => {
  const { data } = await protectedInstance.delete<User>("/me/destroyImage");
  return data;
};
