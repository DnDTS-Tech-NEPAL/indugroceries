import { Metadata } from "next";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { BrandCarousel, ProductsContainer } from "./(components)";
import {
  BenefitsSection,
  BrandCategory,
  SocialFeed,
  SummerSale,
} from "@/templates/default/pages/home/(components)";

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
        breadcrumb={BREADCRUMB_CONFIG.BRANDS}
      />
      <BrandCarousel />
      <ProductsContainer type="bestSellers" />
      <SummerSale />
      <BrandCategory />
      <SocialFeed />
      <BenefitsSection />
    </>
  );
};
export default Products;
