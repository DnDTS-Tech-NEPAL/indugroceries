import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { Metadata } from "next";
import HeroSection from "./(components)/HeroSection";
import AllCategories from "./(components)/AllCategories";
export const metadata: Metadata = {
  title: "Category",
  openGraph: {
    title: "Category",
  },
};
const Category = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Category"
        breadcrumb={BREADCRUMB_CONFIG.CATEGORY}
      />
      <HeroSection/>
      <AllCategories />
    </>
  );
};

export default Category;
