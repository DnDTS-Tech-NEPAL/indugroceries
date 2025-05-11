import { useConfigQuery } from "@/hooks/api";
import { useBrandsQuery } from "@/hooks/api/(web)/brands";
import { FeaturedBrandsItem } from "@/types";

interface BrandsImageItem {
  name: string;
  image: string;
}

export const useFeaturedBrandsImages = (): BrandsImageItem[] => {
  const { data: config } = useConfigQuery();
  const { data: featuredBrandsData } = useBrandsQuery();

  const defaultImage = config?.company_details_url || "";

  if (!featuredBrandsData) {
    return [];
  }

  const featureImages: BrandsImageItem[] = featuredBrandsData.map(
    (item: FeaturedBrandsItem) => ({
      name: item.name,
      image: item.custom_brand_logo_link || defaultImage,
    })
  );

  return featureImages;
};
