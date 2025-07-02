export type BrandType = {
  name: string;
  description: string;
  custom_brand_description: string,
  custom_brand_logo_link: string,
  custom_hero_image_1_link: string,
  custom_hero_image_2_link: string,
  custom_hero_image_3_link: string,
  
};

export type BrandAPIResponseType = {
  error?: string;
  Data: BrandType[];
};
