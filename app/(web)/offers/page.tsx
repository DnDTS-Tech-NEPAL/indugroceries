import { Metadata } from "next";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { ProductsContainer } from "./(components)";

export const metadata: Metadata = {
  title: "Offer",
  openGraph: {
    title: "Offer",
  },
};

const Offer = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Offer Products"
        breadcrumb={BREADCRUMB_CONFIG.OFFER}
      />

      <ProductsContainer />
    </>
  );
};
export default Offer;
