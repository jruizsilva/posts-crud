import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../services/post";
import { useLocation, useParams } from "react-router-dom";

export const usePostByIdQuery = () => {
  const location = useLocation();
  const params = useParams();
  const postId = params.id as string;
  const queryKey = ["/posts", postId];

  const initialPost = location.state?.post;

  const { data: post, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      if (initialPost) {
        return initialPost;
      }
      return fetchPostById(postId);
    },
    initialData: initialPost,
  });

  return { post, ...rest };
};
