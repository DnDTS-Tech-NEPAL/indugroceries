import { ShippingDelivery } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useShippingDelivery = () => {
  return useQuery({
    queryKey: ["shipping"],
    queryFn: ShippingDelivery,
  });
};
