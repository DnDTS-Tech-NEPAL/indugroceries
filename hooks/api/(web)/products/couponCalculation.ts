import { useQuery } from "@tanstack/react-query";

import { getCouponCalculationData } from "@/api";

export const useCouponCalculationQuery = () => {
  return useQuery({
    queryKey: ["coupon-calculation"],
    queryFn: getCouponCalculationData,
    select: (response) => response.data.data,
  });
};
