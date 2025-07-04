import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import BrandProductsPage from "./(components)/Products";
import { CategoryCarousel } from "./(components)/CategoryCarousel";
import { CategoryDescription } from "./(components)";
import { CategoryDetailPageProps } from "@/types";
import CategoryProductsPage from "./(components)/Products";
import { getCategoryDetailByName } from "@/api/queries/category/[categoryName]";
import { redirect } from "next/navigation";

const Category = async ({ params }: CategoryDetailPageProps) => {
   const category = await getCategoryDetailByName();
  const categoryName = decodeURI((await params).categoryName);
 if (!category || category.error) {
    return redirect(ROUTES.NOT_FOUND);
  }
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="All Brands"
        breadcrumb={BREADCRUMB_CONFIG.CATEGORY}
      />
      <CategoryCarousel />
      <CategoryDescription categoryName={categoryName} />
      <CategoryProductsPage category={categoryName}/>
    </>
  );
};
export default Category;
