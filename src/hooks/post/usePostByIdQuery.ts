import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../services/post";
import { useParams } from "react-router-dom";

export const usePostByIdQuery = () => {
  const params = useParams();
  const postId = params.id as string;
  const queryKey = ["/posts", postId];

  const { data: post, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchPostById(postId);
    },
  });

  return { post, ...rest };
};
