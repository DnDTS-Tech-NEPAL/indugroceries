import { useQuery } from "@tanstack/react-query"
import { getCategoriesList } from "@/api"

export const useCategoriesListQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesList,
    select: (response) => {
      const categories = response?.data?.Data?.[0]?.children?.map((item) => ({
        name: item.name,
        description: item.custom_description,
        custom_category_description: item.custom_long_description,
        children: item.children || [],
        is_group: item.is_group,
        parent_item_group: item.parent_item_group,
        image1: item.custom_hero_image_1_link,
        image2: item.custom_hero_image_2_link,        
        image3: item.custom_hero_image_3_link,

      }))

      if (Array.isArray(categories)) return categories
      return []
    },
  })
}
