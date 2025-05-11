import { useQuery } from "@tanstack/react-query";

import { getLoggedInUserDetail } from "@/api";

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getLoggedInUserDetail,
  });
};
