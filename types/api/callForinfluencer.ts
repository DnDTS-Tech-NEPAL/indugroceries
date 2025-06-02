export type CallForInfluencerType = {
  hero_title: string;
  hero_image_link: string;
  hero_description: string;
  title: string;
  infuencer_description: string;
  paragraph_description: string;
  points_title: string;
  apply_title: string;
  apply_description: string;
  note: string;
  footer: string;
  points: PointItemType[];
};

type PointItemType = {
  data_iuai: string;
};

export type CallForInfluencerAPIResponseType = {
  data: CallForInfluencerType;
};
