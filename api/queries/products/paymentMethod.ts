import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { PaymentMethodAPIResponseType } from "@/types/api/products/paymentMethod";

export const getPaymentMethodData = async () => {
  return httpClient.get<PaymentMethodAPIResponseType>(
    API_ROUTES.APP.PRODUCTS.PAYMENT_METHOD
  );
};
