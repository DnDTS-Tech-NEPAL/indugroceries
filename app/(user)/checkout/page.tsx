import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import CheckoutSection from "./(component)/Checkout";



const Checkout = async () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Checkout"
        breadcrumb={BREADCRUMB_CONFIG.CHECKOUT}
      />
     <CheckoutSection/>
    </>
  );
};

export default Checkout;
