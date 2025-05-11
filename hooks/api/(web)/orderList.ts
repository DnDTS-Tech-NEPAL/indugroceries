import { getOrderData } from "@/api/queries/products/orderList";
import { useQuery } from "@tanstack/react-query";

export const useOrderListQuery = () => {
  return useQuery({
    queryKey: ["order-list"],
    queryFn: getOrderData,
    select: (response) => response?.data.message,
  });
};
