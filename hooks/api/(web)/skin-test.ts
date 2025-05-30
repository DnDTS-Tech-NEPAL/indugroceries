import { useQuery } from "@tanstack/react-query";

import { getQuizPageData} from "@/api";
import { QuizPageAPIResponseType} from "@/types";

export const useQuizPageQuery = (initialData?: QuizPageAPIResponseType) => {
  return useQuery({
    queryKey: ["quizpage"],
    queryFn: getQuizPageData,
    initialData: initialData as QuizPageAPIResponseType,
    select: (data) => data.data,
    staleTime: Infinity,
  });
};
