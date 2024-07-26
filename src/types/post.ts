interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostRequest {
  title: string;
  content: string;
}

export type { Post, PostRequest };
