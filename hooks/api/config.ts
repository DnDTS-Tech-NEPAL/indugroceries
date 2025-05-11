import { useQuery } from "@tanstack/react-query";

import { getConfigData } from "@/api";
import { ConfigAPIResponse } from "@/types";

export const useConfigQuery = (initialData?: ConfigAPIResponse) => {
  return useQuery({
    queryKey: ["config"],
    queryFn: getConfigData,
    initialData: initialData as ConfigAPIResponse,
    select: (data) => data.Data,
    staleTime: Infinity,
  });
};
