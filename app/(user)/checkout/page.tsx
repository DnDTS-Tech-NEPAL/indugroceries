import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import CheckoutSection from "./(component)/Checkout";
import { ProductsYouMayLike } from "@/app/(web)/products/[productName]/(components)";
import { SocialFeed } from "@/templates/default/pages/home/(components)";



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
     <ProductsYouMayLike/>
     <SocialFeed/>
    </>
  );
};

export default Checkout;
