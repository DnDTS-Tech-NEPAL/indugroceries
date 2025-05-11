import { useQuery } from "@tanstack/react-query";

import { getDeliveryData } from "@/api";

export const useDeliveryChargesQuery = () => {
  return useQuery({
    queryKey: ["delivery-charges"],
    queryFn: getDeliveryData,
    select: (response) => response.data.data,
  });
};
