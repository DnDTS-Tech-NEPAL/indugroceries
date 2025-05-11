import { getPaymentMethodData } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const usePaymentMethodQuery = () => {
    return useQuery({
      queryKey: ["payment-method"],
      queryFn: getPaymentMethodData,
      select: (response) => {
        const PAYMENT_METHOD = response?.data?.Data;
        return (PAYMENT_METHOD);
      },
    });
  };