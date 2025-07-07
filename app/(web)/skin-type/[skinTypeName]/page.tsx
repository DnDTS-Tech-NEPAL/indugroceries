import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { redirect } from "next/navigation";
import { skinTypeDetailPageProps } from "@/types";
import {SkinTypeCarousel, SkinTypeDescription } from "./(components)";
import SkinTypeProductsPage from "./(components)/Products";
import { getSkinDetailByName } from "@/api/queries/skin-type/[skinTypeName]";

const SkinType = async ({ params }: skinTypeDetailPageProps) => {
  const skinType = await getSkinDetailByName();
  const skinTypeName = decodeURI((await params).skinTypeName);

  if (!skinType || skinType.error) {
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
      <SkinTypeCarousel skinTypeName={skinTypeName} />
      <SkinTypeDescription skinTypeName={skinTypeName} />
      <SkinTypeProductsPage skinTypeName={skinTypeName} />
    </>
  );
};

export default SkinType;
