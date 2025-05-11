export type SaafFeatureType = {
    description: string;
    icon_link:string;
    parent: string;
    parentfield: string;
    parenttype: string;
};
export type SaafPageType = {
    title: string;
    description: string;
    hero_image: string;
    brand_tagline: string;
    brand_description: string;
    brand_image: string;
    product_title: string;
    product_description: string;
    image_1_link: string;
    image_2_link: string;
    image_3_link: string;
    image_4_link: string;
    image_5_link: string;
    feature_title: string;
    footer_title: string;
    footer_description: string;
    footer_image_link:string;
    attach_image_sakq:string;
    features_table: SaafFeatureType[];
  };
  
  export type SaafPageAPIResponseType = {
    Data: SaafPageType;
  };
  