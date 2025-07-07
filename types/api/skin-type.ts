export type SkinTypeType = {
    name: string;
    image: string;
    skin_type_image_link:string;
    hero_image_1_link: string;
    hero_image_2_link: string;
    hero_image_3_link: string;
    short_description: string;
    long_description: string;
  };
  
  export type SkinTypeAPIResponseType = {
    error?: string;
    data: SkinTypeType[];
  };
  