import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";

export const updateWishlistCart = (guid: string) => {
  return httpClient.post(API_ROUTES.AUTH.GUEST_CARTWISHLIST, { guid });
};
