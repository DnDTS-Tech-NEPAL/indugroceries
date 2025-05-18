import { useBrandsListQuery, useCategoriesListQuery } from "@/hooks/api"
import type { FilterAccordionProps } from "@/types"

// fetch brands and categories and set data to filter items
export const useProductsFilter = () => {
  const { data: brandsList = [], isLoading: isBrandsLoading } = useBrandsListQuery()

  const { data: categoriesList = [], isLoading: isCategoriesLoading } = useCategoriesListQuery()

  const filters: FilterAccordionProps[] = [
    {
      title: "Brands",
      name: "brand",
      items: brandsList?.map((brand) => ({
        value: brand.name,
        title: brand.name,
      })),
      isFetching: isBrandsLoading,
    },
    {
      title: "Category",
      name: "item_group",
      items: categoriesList?.map((category) => {
        // Check if children exists and has items
        const hasChildren =
          category.children !== undefined && Array.isArray(category.children) && category.children.length > 0

        return {
          value: category.name,
          title: category.name,
          hasChildren: hasChildren,
          children: category.children || [],
        }
      }),
      isFetching: isCategoriesLoading,
    },
  ]

  return filters
}

