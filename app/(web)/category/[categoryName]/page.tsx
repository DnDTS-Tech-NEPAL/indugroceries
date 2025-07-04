import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import BrandProductsPage from "./(components)/Products";
import { CategoryCarousel } from "./(components)/CategoryCarousel";
import { CategoryDescription } from "./(components)";
import { CategoryDetailPageProps } from "@/types";

const Category = async ({ params }: CategoryDetailPageProps) => {
 
  const categoryName = decodeURI((await params).categoryName);

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="All Brands"
        breadcrumb={BREADCRUMB_CONFIG.BRANDS}
      />
      <CategoryCarousel />
      <CategoryDescription categoryName={categoryName} />
      <BrandProductsPage brandName={categoryName} />
    </>
  );
};
export default Category;
