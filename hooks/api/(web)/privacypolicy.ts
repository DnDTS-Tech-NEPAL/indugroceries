import { getPrivacyPolicy } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const usePrivacyPolicy = () => {
  return useQuery({
    queryKey: ["privacy"],
    queryFn: getPrivacyPolicy,
  });
};
