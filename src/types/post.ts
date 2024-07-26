import { User } from "./user";

interface Post {
  id: number;
  title: string;
  content: string;
  user: User;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface PostRequest {
  title: string;
  content: string;
}

export type { Post, PostRequest };
