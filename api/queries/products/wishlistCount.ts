import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { WishlistCountAPIResponseType } from "@/types";

export const getWishlistCountData = async (guid: string) => {
  return httpClient.post<WishlistCountAPIResponseType>(
    API_ROUTES.APP.PRODUCTS.WISHLIST.COUNT,
    { guid }
  );
};
