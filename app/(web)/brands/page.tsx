import { Metadata } from "next";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import AllBrands from "./(components)/AllBrands";
import HeroSection from "./(components)/HeroSection";

export const metadata: Metadata = {
  title: "Brands",
  openGraph: {
    title: "Brands",
  },
};

const Brands = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="All Brands"
        breadcrumb={BREADCRUMB_CONFIG.BRANDS}
      />
      <HeroSection />
      <AllBrands />
    </>
  );
};
export default Brands;
