import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../services/post";
import { useLocation, useParams } from "react-router-dom";
import { Post } from "../../types/post";

export const usePostByIdQuery = () => {
  const location = useLocation();
  const params = useParams();
  const postId = params.id as string;
  const queryKey = ["/posts", postId];

  const initialPost: Post | undefined = location.state?.post;

  const { data: post, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      if (initialPost) {
        return initialPost;
      }
      return await fetchPostById(postId);
    },
    initialData: initialPost,
  });

  return { post, ...rest };
};
