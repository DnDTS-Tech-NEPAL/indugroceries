import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { UserProfileType } from "@/types";

export const getLoggedInUserDetail = async (): Promise<UserProfileType> => {
  const response = await httpClient.post(API_ROUTES.USER.PROFILE.GET);
  return response?.data;
};
