import { getCallForinfluencerData } from "@/api";
import { CallForInfluencerAPIResponseType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useCallForinfluencer = (initialData?: CallForInfluencerAPIResponseType) => {
  return useQuery({
    queryKey: ["callForinfluencer"],
    queryFn: getCallForinfluencerData,
     initialData: initialData as CallForInfluencerAPIResponseType,
    select: (data) => data.data,
    staleTime: Infinity,
  });
};
