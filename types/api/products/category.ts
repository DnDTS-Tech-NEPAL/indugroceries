export type CategoryType = {
  name: string;
  custom_description: string;
  custom_long_description: string;
  custom_hero_image_1_link: string,
  custom_hero_image_2_link: string,
  custom_hero_image_3_link: string,
  parent_item_group: string;
  is_group: 1 | 0;
  children: CategoryType[];
};

export type CategoryAPIResponseType = {
  Data: CategoryType[];
};
