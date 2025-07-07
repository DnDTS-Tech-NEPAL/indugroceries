import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { getBrandDetailByName } from "@/api/queries/brands/[brandName]";
import { redirect } from "next/navigation";
import { BrandDetailPageProps } from "@/types";
import { BrandDescription, SkinTypeCarousel } from "./(components)";
import SkinTypeProductsPage from "./(components)/Products";

const Brands = async ({ params }: BrandDetailPageProps) => {
  const brand = await getBrandDetailByName();
  const skinTypeName = decodeURI((await params).brandName);

  if (!brand || brand.error) {
    return redirect(ROUTES.NOT_FOUND);
  }

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="All Brands"
        breadcrumb={BREADCRUMB_CONFIG.BRANDS}
      />
      <SkinTypeCarousel brandName={skinTypeName} />
      <BrandDescription brandName={skinTypeName} />
      <SkinTypeProductsPage skinTypeName={skinTypeName} />
    </>
  );
};
export default Brands;
