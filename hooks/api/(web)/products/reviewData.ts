import { useQuery } from "@tanstack/react-query";
import { getReviewData } from "@/api";

export const useReviewDataQuery = (item_code: string) => {
  return useQuery({
    queryKey: ["review-data", item_code],
    queryFn: () => getReviewData(item_code),
    select: (data) => data.data.data ?? [],
    enabled: !!item_code,
  });
};
