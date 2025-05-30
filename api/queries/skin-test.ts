import { API_ROUTES } from "@/constants";
import { QuizPageAPIResponseType} from "@/types";

export const getQuizPageData = async (): Promise<QuizPageAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.SKIN_TEST,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();
console.log("this is data",data)
  return data;
};
