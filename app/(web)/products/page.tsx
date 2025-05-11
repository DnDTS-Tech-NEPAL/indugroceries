import { Metadata } from "next";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { ProductsContainer } from "./(components)";

export const metadata: Metadata = {
  title: "Products",
  openGraph: {
    title: "Products",
  },
};

const Products = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="All Products"
        breadcrumb={BREADCRUMB_CONFIG.PRODUCTS}
      />

      <ProductsContainer />
    </>
  );
};
export default Products;
