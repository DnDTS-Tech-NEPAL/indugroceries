import { useQuery } from "@tanstack/react-query";

import { getProductDetailByName, getRecentlyViewedProducts } from "@/api";
import {
  IndividualProductAPIType,
  RecentlyViewedProductAPIType,
} from "@/types";

export const useProductDetailByNameQuery = (
  productName: string,
  initialData?: IndividualProductAPIType
) => {
  return useQuery({
    queryKey: ["product-detail", productName],
    queryFn: () => getProductDetailByName(productName),
    initialData,
    select: (response) => response as IndividualProductAPIType,
    staleTime: Infinity,
  });
};

// Custom React Query hook to fetch and cache recently viewed products
export const useRecentlyViewedProductsQuery = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["recently-viewed"],
    queryFn: () => getRecentlyViewedProducts(),
    select: (response) => response as RecentlyViewedProductAPIType[],
    enabled: isAuthenticated,
    retry: false,
  });
};
