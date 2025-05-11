// import { useConfigQuery, useHomePageQuery } from "@/hooks/api";

// export const useFeaturedCategoryImages = () => {
//   const { data: config } = useConfigQuery();
//   const { data: featuredCategoryData } = useHomePageQuery();

//   const featureImages = [
//     featuredCategoryData.featured_img1_url,
//     featuredCategoryData.featured_img2_url,
//     featuredCategoryData.featured_img3_url,
//     featuredCategoryData.featured_img4_url,
//   ].map((url) => url || config.company_details_url);

//   return featureImages;
// };
import { useConfigQuery } from "@/hooks/api";
import { useFeatureQuery } from "@/hooks/api/(web)/features";
import { FeaturedCategoryItem } from "@/types";

interface CategoryImageItem {
  name: string;
  image: string;
}

export const useFeaturedCategoryImages = (): CategoryImageItem[] => {
  const { data: config } = useConfigQuery();
  const { data: featuredCategoryData } = useFeatureQuery();

  const defaultImage = config?.company_details_url || "";

  if (!featuredCategoryData) {
    return [];
  }

  const featureImages: CategoryImageItem[] = featuredCategoryData.map(
    (item: FeaturedCategoryItem) => ({
      name: item.name,
      image: item.custom_image_link || defaultImage,
    })
  );

  return featureImages;
};
