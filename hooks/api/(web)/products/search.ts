import { useQuery } from "@tanstack/react-query";
import { getSearchList } from "@/api";

export const useSearchListQuery = (item_code?: string, options = {}) => {
  return useQuery({
    queryKey: ["search", item_code],
    queryFn: () => getSearchList({ item_code }),
    enabled: !!item_code,
    ...options,
  });
};
