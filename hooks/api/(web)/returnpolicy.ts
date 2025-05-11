import { getReturnPolicy } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useReturnPolicy = () => {
  return useQuery({
    queryKey: ["return"],
    queryFn: getReturnPolicy,
  });
};
