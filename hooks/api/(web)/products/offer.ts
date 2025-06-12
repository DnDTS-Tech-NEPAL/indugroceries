import { useQuery } from "@tanstack/react-query";

import { offerProducts } from "@/api";
import { ProductFilterAPIType } from "@/types";
import { convertProductsData } from "@/utils";

export const useOfferProductsQuery = (filter: ProductFilterAPIType) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => offerProducts(filter),
    select: (response) => {
      const products = response?.data?.data?.items;
      const total_count = response?.data?.data.total_count;
      return { products: convertProductsData(products), total_count };
    },
  });
};
