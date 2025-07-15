import { useQuery } from "@tanstack/react-query";
import { getConfigData } from "@/api";
import { ConfigAPIResponse } from "@/types";

export const useConfigQuery = (initialData?: ConfigAPIResponse) => {
  return useQuery({
    queryKey: [
      "config",
      typeof window !== "undefined" ? localStorage.getItem("city") || "" : "",
    ],
    queryFn: () => {
      const city =
        typeof window !== "undefined" ? localStorage.getItem("city") || "" : "";
      return getConfigData(city);
    },
    initialData: initialData as ConfigAPIResponse,
    select: (data) => data.Data,
    staleTime: Infinity,
  });
};
