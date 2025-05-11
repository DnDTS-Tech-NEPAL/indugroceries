import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { IndividualProductAPIType } from "@/types";

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

    // eslint-disable-next-line
  } catch (e) {}
};
