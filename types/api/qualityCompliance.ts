export type QualityFeatureType = {
  title: string;
  description: string;
  icon_image_link:string;
  parent: string;
  parentfield: string;
  parenttype: string;
};
export type QualityComplaincePageType = {
  hero_title: string;
  hero_description: string;
  hero_image_link: string;
  content_title: string;
  content_description: string;
  content_image_link: string;
  content_2_title: string;
  content_2_description: string;
  content_2_image_link: string;
  feature_title: string;
  feature_description: string;
  footer_title: string;
  footer_description: string;
  footer_image_link: string;
  features_table: QualityFeatureType[];
};
  
  export type QualityComplaincePageAPIResponseType = {
    Data: QualityComplaincePageType;
  };
  