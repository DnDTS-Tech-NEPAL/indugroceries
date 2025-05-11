import { useQuery } from "@tanstack/react-query";

import { getQualityCompliancePageData } from "@/api";
import { QualityComplaincePageAPIResponseType } from "@/types";

export const useQualityCompliancePageQuery = (initialData?: QualityComplaincePageAPIResponseType) => {
  return useQuery({
    queryKey: ["qualityCompliance"],
    queryFn: getQualityCompliancePageData,
    initialData: initialData as QualityComplaincePageAPIResponseType,
    select: (data) => data.Data,
    staleTime: Infinity,
  });
};
