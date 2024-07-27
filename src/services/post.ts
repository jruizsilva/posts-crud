import { protectedInstance } from "../api/axiosInstances";
import { Post, PostRequest } from "../types/post";

export const fetchPostList = async (locationSearch: string) => {
  const { data } = await protectedInstance.get<Post[]>(
    `/posts${locationSearch}`
  );
  return data;
};

export const fetchPostById = async (postId: string) => {
  const { data } = await protectedInstance.get<Post>(`/posts/${postId}`);
  return data;
};

export const fetchCreatePost = async (postRequest: PostRequest) => {
  const { data } = await protectedInstance.post<Post>("/posts", postRequest);
  return data;
};

export const fetchEditPost = async (
  postId: string,
  postRequest: PostRequest
) => {
  const { data } = await protectedInstance.put<Post>(
    `/posts/${postId}`,
    postRequest
  );
  return data;
};

export const fetchDeletePost = async (postId: string) => {
  const { data } = await protectedInstance.delete<[]>(`/posts/${postId}`);
  return data;
};
