import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { ShippingDelivery } from "./(components)";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "shipping-Delivery",
  openGraph: {
    title: "Shipping-delivery",
  },
};
const ShippingDeliverypage = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Shipping-Delivery"
        breadcrumb={BREADCRUMB_CONFIG.RETURN_Policy}
      />
      <ShippingDelivery />
    </>
  );
};

export default ShippingDeliverypage;
