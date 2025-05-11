import { useQuery } from "@tanstack/react-query";

import { getSaafPageData } from "@/api";
import { SaafPageAPIResponseType } from "@/types";

export const useSaafPageQuery = (initialData?: SaafPageAPIResponseType) => {
  return useQuery({
    queryKey: ["saaf"],
    queryFn: getSaafPageData,
    initialData: initialData as SaafPageAPIResponseType,
    select: (data) => data.Data,
    staleTime: Infinity,
  });
};
