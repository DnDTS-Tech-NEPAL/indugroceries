import { useBrandsListQuery, useCategoriesListQuery } from "@/hooks/api";
import { FilterAccordionProps } from "@/types";

// fetch brands and categories and set data to filter items
export const useProductsFilter = () => {
  const { data: brandsList = [], isLoading: isBrandsLoading } =
    useBrandsListQuery();

  const { data: categoriesList = [], isLoading: isCategoriesLoading } =
    useCategoriesListQuery();

  const filters: FilterAccordionProps[] = [
    // {
    //   title: "Brands",
    //   name: "brand",
    //   items: brandsList?.map((brand) => ({
    //     value: brand.name,
    //     title: brand.name,
    //   })),
    //   isFetching: isBrandsLoading,
    // },
    {
      title: "Category",
      name: "item_group",
      items: categoriesList?.map((category) => ({
        value: category.name,
        title: category.name,
      })),
      isFetching: isCategoriesLoading,
    },
  ];

  return filters;
};
