import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { BrandCarousel } from "./(components)/BrandCarousel";
import { getBrandDetailByName } from "@/api/queries/brands/[brandName]";
import { redirect } from "next/navigation";
import { BrandDetailPageProps } from "@/types";

const Brands = async ({ params }: BrandDetailPageProps) => {

  const brand = await getBrandDetailByName();
  
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
      <BrandCarousel />
    </>
  );
};
export default Brands;
