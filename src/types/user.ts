import { Pagination } from "./global";
import { Post } from "./post";

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  posts: Post[];
  created_at: string;
  updated_at: string;
}

interface UserListResponse extends Pagination {
  data: User[];
}

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

interface UserUpdateRequest {
  name?: string;
  image?: File;
}

export type { User, UserRequest, UserListResponse, UserUpdateRequest };
