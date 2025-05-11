import { getTermsAndCondition } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useTermsAndCodition = () => {
  return useQuery({
    queryKey: ["termsandcondition"],
    queryFn: getTermsAndCondition,
  });
};
