import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import {
  IndividualProductAPIType,
  RecentlyViewedProductAPIType,
} from "@/types";

export const getProductDetailByName = async (
  productName: string
): Promise<IndividualProductAPIType | undefined> => {
  try {
    const response = await httpClient.post(
      API_ROUTES.APP.PRODUCTS.INDIVIDUAL_PRODUCT.GET,
      {
        item_code: productName,
      }
    );
    const product = response?.data?.Data;
    return product;
  } catch (e) {}
};

// Function to fetch recently viewed products from the API
export const getRecentlyViewedProducts = async (): Promise<
  RecentlyViewedProductAPIType[] | undefined
> => {
  try {
    const response = await httpClient.get(
      API_ROUTES.APP.PRODUCTS.INDIVIDUAL_PRODUCT.RECENTLY_VIEWED
    );
    const products = response?.data?.data;
    return products ?? [];
  } catch (e) {
    console.error("Failed to fetch recently viewed products:", e);
    return [];
  }
};


// Function to add a product to the list of recently viewed products
export const addRecentlyViewedProduct = async (
  productName: string
): Promise<IndividualProductAPIType | undefined> => {
  try {
    const response = await httpClient.post(
      API_ROUTES.APP.PRODUCTS.INDIVIDUAL_PRODUCT.ADD_RECENTLY_VIEWED,
      {
        item_code: productName,
      }
    );
    const product = response?.data?.data;
    return product;
  } catch (e) {}
};
