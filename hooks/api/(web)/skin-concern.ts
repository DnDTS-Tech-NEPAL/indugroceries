import { useQuery } from "@tanstack/react-query";
import { SkinConcernAPIResponseType } from "@/types/api/skin-concern";
import { getSkinConcernPageData } from "@/api";
export const useSkinConcernPageQuery = (initialData?: SkinConcernAPIResponseType) => {
  return useQuery({
    queryKey: ["skinconcern"],
    queryFn: getSkinConcernPageData,
    initialData: initialData as SkinConcernAPIResponseType,
    select: (data) => data.data,
    staleTime: Infinity,
  });
};
