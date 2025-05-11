import { getProductsLikeData } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useProductsLikeQuery = () => {
  return useQuery({
    queryKey: ["products-like"],
    queryFn: getProductsLikeData,
    select: (data) => data.data.data ?? [],
  });
};
