import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { BrandCarousel } from "./(components)/BrandCarousel";
import { getBrandDetailByName } from "@/api/queries/brands/[brandName]";
import { redirect } from "next/navigation";
import { BrandDetailPageProps } from "@/types";
import { BrandDescription } from "./(components)";
import BrandProductsPage from "./(components)/Products";

const Brands = async ({ params }: BrandDetailPageProps) => {
  const brand = await getBrandDetailByName();
  const brandName = decodeURI((await params).brandName);

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
      <BrandCarousel brandName={brandName} />
      <BrandDescription brandName={brandName} />
      <BrandProductsPage brandName={brandName} />
    </>
  );
};
export default Brands;
