import { useQuery } from "@tanstack/react-query";

import { getDeliveryData } from "@/api";

export const useDeliveryLocationsQuery = () => {
  return useQuery({
    queryKey: ["delivery-location"],
    queryFn: getDeliveryData,
    select: (response) => response.data.data,
  });
};
