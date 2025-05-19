import { useQuery } from "@tanstack/react-query";

import { getProductDetailByName } from "@/api";
import { IndividualProductAPIType } from "@/types";

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
