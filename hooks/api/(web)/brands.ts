import { useQuery } from "@tanstack/react-query";
import { FeaturedBrandsAPIResponseType } from "@/types";
import { getBrandsCatogery } from "@/api/queries/brand";

export const useBrandsQuery = () => {
  return useQuery({
    queryKey: ["featuredbrands"],
    queryFn: getBrandsCatogery,
    select: (res: FeaturedBrandsAPIResponseType) =>
      Array.isArray(res.data) ? res.data : [],
    staleTime: Infinity,
  });
};
