import { useQuery } from "@tanstack/react-query";

import { getNewArrivals } from "@/api";
import { convertProductsData } from "@/utils";

export const useNewArrivalsQuery = () => {
  return useQuery({
    queryKey: ["new-arrivals"],
    queryFn: () => getNewArrivals(),
    select: (response) => {
      const products = response?.data?.data;
      return convertProductsData(products);
    },
  });
};
