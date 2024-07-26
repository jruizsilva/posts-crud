import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "../../services/post";

export const usePostListQuery = () => {
  const queryKey = ["/posts"];

  const { data: posts, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetchPostList();
    },
  });

  return { posts, ...rest };
};
