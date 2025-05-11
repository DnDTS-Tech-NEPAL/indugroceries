import { useQuery } from "@tanstack/react-query";

import { getBestSellers } from "@/api";
import { convertProductsData } from "@/utils";

export const useBestSellersQuery = () => {
  return useQuery({
    queryKey: ["best-sellers"],
    queryFn: () => getBestSellers(),
    select: (response) => {
      const products = response?.data?.data;
      return convertProductsData(products);
    },
  });
};
