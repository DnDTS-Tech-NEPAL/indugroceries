import { useQuery } from "@tanstack/react-query";
import { NavmenuAPIResponse } from "@/types";
import { getNavMenuData } from "@/api/queries/navMenu";

export const useNavMenuQuery = () => {
  return useQuery({
    queryKey: ["brands-category"],
    queryFn: getNavMenuData,
    select: (res: NavmenuAPIResponse) =>
      Array.isArray(res.Data) ? res.Data : [],
    staleTime: Infinity,
  });
};
