import { Metadata } from "next";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { RecommendProducts } from "./(components)";
export const metadata: Metadata = {
  title: "Recommend Products",
  openGraph: {
    title: "Recommend Products",
  },
};

const Recommend = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Recommend Products"
        breadcrumb={BREADCRUMB_CONFIG.RECOMMEND_PRODUCTS}
      />
      <RecommendProducts />
    </>
  );
};
export default Recommend;
