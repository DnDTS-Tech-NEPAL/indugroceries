import { useQuery } from "@tanstack/react-query"
import { getCategoriesList } from "@/api"

export const useCategoriesListQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesList,
    select: (response) => {
      const categories = response?.data?.Data?.[0]?.children?.map((item) => ({
        name: item.name,
        children: item.children || [],
        is_group: item.is_group,
        parent_item_group: item.parent_item_group,
      }))

      if (Array.isArray(categories)) return categories
      return []
    },
  })
}
