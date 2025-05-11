import { getItemProductsLikeData } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useItemProductsLikeQuery = (itemCode?: string) => {
  return useQuery({
    queryKey: ["item_products_like", itemCode],
    queryFn: () => getItemProductsLikeData(itemCode),
    select: (data) => data.data.data ?? [],
    enabled: !!itemCode,
  });
};
