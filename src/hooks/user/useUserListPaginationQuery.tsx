import { useQuery } from "@tanstack/react-query";
import { fetchUserListPagination } from "../../services/user";

export const useUserListPaginationQuery = (locationSearch: string = "") => {
  const queryKey = ["/users", locationSearch];

  const { data: users, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetchUserListPagination(locationSearch);
    },
  });

  return { users, ...rest };
};
