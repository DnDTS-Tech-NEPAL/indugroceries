import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { RemoveFromCartPayloadType, WishlistPayloadType } from "@/types";

export const addToCart = (data: WishlistPayloadType) => {
  return httpClient.post(API_ROUTES.APP.PRODUCTS.CART.ADD, data);
};

export const addToCartNew = (data: WishlistPayloadType) => {
  return httpClient.post(API_ROUTES.APP.PRODUCTS.CART.ADD_NEW, data);
};

export const removeFromCart = (data: RemoveFromCartPayloadType) => {
  return httpClient.post(API_ROUTES.APP.PRODUCTS.CART.REMOVE, data);
};
