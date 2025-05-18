export type BrandType = {
  name: string;
  custom_brand_logo_link: string,
  custom_hero_image_1_link: string,
  custom_hero_image_2_link: string,
};

export type BrandAPIResponseType = {
  Data: BrandType[];
};
