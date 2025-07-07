import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import {
    SkinTypeAPIResponseType,
} from "@/types";

export const getSkinDetailByName = async (): Promise<SkinTypeAPIResponseType | undefined> => {
  try {
    const response = await httpClient.post(
      API_ROUTES.APP.SKIN_TYPE
    );
    const skinType = response?.data;
    return skinType;
  } catch (e) {}
};

