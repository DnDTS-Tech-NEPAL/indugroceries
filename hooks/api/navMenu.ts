import { useQuery } from "@tanstack/react-query";
import { NavmenuAPIResponse } from "@/types";
import { getNavMenuData } from "@/api/queries/navMenu";

export const useNavMenuQuery = (initialData?: NavmenuAPIResponse) => {
  return useQuery({
    queryKey: ["navMenu"],
    queryFn: getNavMenuData,
    initialData: initialData as NavmenuAPIResponse,
    select: (data) => data.Data,
    staleTime: Infinity,
  });
};
