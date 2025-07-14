import { useQuery } from "@tanstack/react-query";

import { getCartCountData } from "@/api";

export const useCartCountQuery = (guid: string) => {
  return useQuery({
    queryKey: ["cart-count", guid],
    queryFn: () => getCartCountData(guid),
    select: (response) => response?.data.data,
  });
};
