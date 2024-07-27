import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../services/post";

export const usePostByIdQuery = (postId: number) => {
  const queryKey = ["/posts", postId];

  const { data: post, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await fetchPostById(postId);
    },
  });

  return { post, ...rest };
};
