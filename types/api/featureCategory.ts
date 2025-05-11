export type FeaturedCategoryItem = {
  name: string;
  custom_image_link: string;
};

export type FeaturedCategoryAPIResponseType = {
  data: FeaturedCategoryItem[];
};
