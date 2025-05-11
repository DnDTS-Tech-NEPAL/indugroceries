export type AboutUsPageType = {
  description: string;
  hero_image: string;
  mission_description: string;
  mission_image: string;
  mission_points: string[];
  mission_title: string;
  title: string;
  vision_description: string;
  vision_image: string;
  vision_points: string[];
  vision_title: string;
  mission_points_description: string[];
  vision_points_description: string[];
  why_choose_us_title: string;
  why_choose_us_description: string;
  why_choose_us_points: string[];
  why_choose_us_points_description: string[];
  // team section
  our_team_title: string;
  our_team_description: string;
  our_team_name: string[];
  our_team_designation: string[];
  our_team_person_description: string[];
  our_team_image: string[];
  // journey section
  journey_title: string;
  journey_description: string;
  // timeline section
  timeline_tagline: string;
  timeline_title: string;
  timeline_description: string;
  timeline_points: string[];
  timeline_points_description: string[];
  // testimonials
  testimonial_person: string[];
  testimonial: string[];
  testimonial_designation: string[];
  testimonial_rating: number[];
  testimonial_picture: string[];
  // values section
  values_title: string;
  values_description: string;
  testimonial_visibility:number;
  //join us footer section
  footer_title: string;
  footer_description: string;
  footer_image_link: string;
};

export type AboutUsPageAPIResponseType = {
  Data: AboutUsPageType;
};
