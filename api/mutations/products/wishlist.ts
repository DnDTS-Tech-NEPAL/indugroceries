import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import {
  RemoveFromWishlistPayloadType,
  WishlistApiType,
  WishlistPayloadType,
} from "@/types";

export const wishlist = (data: WishlistPayloadType) => {
  return httpClient.post(API_ROUTES.APP.PRODUCTS.WISHLIST.ADD, data);
};

export const removefromwishlist = (data: RemoveFromWishlistPayloadType) => {
  return httpClient.post(API_ROUTES.APP.PRODUCTS.WISHLIST.REMOVE, data);
};

export const getWishlistData = () => {
  return httpClient.get<WishlistApiType>(API_ROUTES.APP.PRODUCTS.WISHLIST.GET);
};
