import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { AllProducts } from "./(components)";
import { Metadata } from "next";
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

      <AllProducts />
    </>
  );
};

export default Category;
