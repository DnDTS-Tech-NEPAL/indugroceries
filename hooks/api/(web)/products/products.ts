import { useQuery } from "@tanstack/react-query";

import { filterProducts } from "@/api";
import { ProductFilterAPIType } from "@/types";
import { convertProductsData } from "@/utils";

export const useFilterProductsQuery = (filter: ProductFilterAPIType) => {
  const { brand, item_group, bestseller, pricerange} = filter;

  return useQuery({
    // queryKey: ["products", filter],
      queryKey: ["products",brand, item_group, bestseller, pricerange,filter],
    queryFn: () => filterProducts(filter),
    select: (response) => {
      const products = response?.data?.data?.items;
      const total_count = response?.data?.data.total_count;
      return { products: convertProductsData(products), total_count };
    },
  });
};
