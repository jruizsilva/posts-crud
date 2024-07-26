import { protectedInstance } from "../api/axiosInstances";
import { Post, PostRequest } from "../types/post";

export const fetchPostList = async () => {
  const { data } = await protectedInstance.get<Post[]>("/posts");
  return data;
};

export const fetchPostById = async (productId: string) => {
  const { data } = await protectedInstance.get<Post>(`/posts/${productId}`);
  return data;
};

export const fetchCreatePost = async (postRequest: PostRequest) => {
  const { data } = await protectedInstance.post<Post>("/posts", postRequest);
  return data;
};

export const fetchEditPost = async (
  productId: string,
  postRequest: PostRequest
) => {
  const { data } = await protectedInstance.put<Post>(
    `/posts/${productId}`,
    postRequest
  );
  return data;
};

export const fetchDeletePost = async (productId: string) => {
  const { data } = await protectedInstance.delete<[]>(`/posts/${productId}`);
  return data;
};
