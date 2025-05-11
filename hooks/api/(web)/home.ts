import { useQuery } from "@tanstack/react-query";

import { getHomePageData } from "@/api";
import { HomePageAPIResponseType } from "@/types";

export const useHomePageQuery = (initialData?: HomePageAPIResponseType) => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomePageData,
    initialData: initialData as HomePageAPIResponseType,
    select: (data) => data.Data,
    staleTime: Infinity,
  });
};
