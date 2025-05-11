import { useQuery } from "@tanstack/react-query";
import { getFeatureCatogery } from "@/api/queries/feature";
import { FeaturedCategoryAPIResponseType } from "@/types";

export const useFeatureQuery = () => {
  return useQuery({
    queryKey: ["features"],
    queryFn: getFeatureCatogery,
    select: (res: FeaturedCategoryAPIResponseType) =>
      Array.isArray(res.data) ? res.data : [],
    staleTime: Infinity,
  });
};
