import { useQuery } from "@tanstack/react-query";

import { getCategoriesList } from "@/api";

export const useCategoriesListQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesList,
    select: (response) => {
      const categories = response?.data?.Data?.[0]?.children?.map((item) => ({
        name: item.name,
      }));

      if (Array.isArray(categories)) return categories;
      return [];
    },
  });
};
