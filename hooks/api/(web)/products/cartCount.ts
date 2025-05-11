import { useQuery } from "@tanstack/react-query";

import { getCartCountData } from "@/api";

export const useCartCountQuery = () => {
  return useQuery({
    queryKey: ["cart-count"],
    queryFn: getCartCountData,
    select: (response) => response?.data.data,
  });
};
