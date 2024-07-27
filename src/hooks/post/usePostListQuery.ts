import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "../../services/post";

export const usePostListQuery = (locationSearch: string = "") => {
  const queryKey = ["/posts"];

  const { data: posts, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetchPostList(locationSearch);
    },
  });

  return { posts, ...rest };
};
