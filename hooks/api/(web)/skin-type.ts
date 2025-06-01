import { useQuery } from "@tanstack/react-query";
import { getSkinTypePageData} from "@/api";
import { SkinTypeAPIResponseType } from "@/types";
export const useSkinTypePageQuery = (initialData?: SkinTypeAPIResponseType) => {
  return useQuery({
    queryKey: ["skintype"],
    queryFn: getSkinTypePageData,
    initialData: initialData as SkinTypeAPIResponseType,
    select: (data) => data.data,
    staleTime: Infinity,
  });
};
