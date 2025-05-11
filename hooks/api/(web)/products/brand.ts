import { useQuery } from "@tanstack/react-query";

import { getBrandsList } from "@/api";

export const useBrandsListQuery = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrandsList,
    select: (response) => {
      const brands = response?.data?.Data;

      if (Array.isArray(brands)) return brands;
      return [];
    },
  });
};
