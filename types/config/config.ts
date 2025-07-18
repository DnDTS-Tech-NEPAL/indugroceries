import { Topbar } from "./../../templates/default/components/layout/topbar/index";
export type ConfigType = {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  button_visibility: number;
  contact_number: string;
  company_details_name: string;
  company_details_logo: string;
  company_details_url: string;
  footer_description: string;
  company_contact_email: string;
  facebook: string;
  company_contact_twitter: string;
  company_contact_instagram: string;
  company_contact_youtube: string;
  company_contact_whatsapp: string;
  company_contact_viber: string;
  tiktok: string;
  hero_bg: string;
  bg_footer: string;
  bottom_bg_footer: string;
  primary_50: string;
  primary_100: string;
  primary_200: string;
  primary_300: string;
  primary_400: string;
  grey_100: string;
  grey_200: string;
  grey_300: string;
  info_light: string;
  background_dark: string;
  text_dark: string;
  normal_text_light: string;
  normal_text_dark: string;
  offer_section_light: string;
  offer_section_dark: string;
  sale_backgound: string;
  banner_100: string;
  banner_200: string;
  separator_light: string;
  naming_series: string;
  doctype: string;
  height: number;
  width: number;
  currency: string;
  login_screen_photo: string;
  login_screen_photo_link: string;
  set_password_screen_photo: string;
  set_password_screen_photo_link: string;
  forgot_password_photo: string;
  forgot_password_screen_photo_link: string;
  register_screen_photo: string;
  register_screen_photo_link: string;
  otp_screen_photo: string;
  otp_screen_photo_link: string;

  //visibility section
  cart_visibility: number;
  wishlist_visibility: number;
  rate_visibility: number;
  register_visibility: number;
  login_visibility: number;
  sale_visibility: number;
  hero_visibility: number;
  featured_visibility: number;
  offer_visibility: number;
  new_arrival_visibility: number;
  best_seller_visibility: number;
  banner_visibility: number;
  category_visibility: number;
  search_box_visibility: number;
  breadcrum_visibility: number;
  featured_brands_visibility: number;
  products_you_may_like_visibility: number;
  hero_type: string;
  sale_type: string;
  //topnav
  top_navbar_visibility: number;
  top_nav_bar_label: string;
  top_navbar_content: string;
  top_nav_bar_redirect_link: string;
  top_navbar_city: string;

  // footer section
  footer_logo_url: string;
  quick_links: QuickLinkType[];

  //global reach section
  banner_3_title: string;
  banner_3_description: string;
  banner_3_image_url_horizontal: string;
  banner_3_image_url_vertical: string;

  //productshowcase section
  four_banner_table: FourBannerType[];
  // remove these later
  location: string;
  template: string;

  //in store visit section and shop by makeup/skincare
  banners: BannerType[];

  //homebenefit section
  footer_cards: FooterCardType[];

  //social feed section
  social_title: string;
  social_description: string;
  ecommerce_social_links: SocialLinkType[];
};
export type FooterCardType = {
  card_label: string;
  card_content: string;
  card_icon: string;
};
export type FourBannerType = {
  card_type: string;
  image_link: string;
  card_title: string;
  card_subtitle: string;
  card_description: string;
  button_label: string;
  redirect_link: string;
};

export type SocialLinkType = {
  idx: number;
  social_links: string;
  video_link: string;
  display_label: string;
  item_1: string;
  item_2: string;
  item_3: string;
};
export type QuickLinkType = {
  idx: number;
  label: string;
  route: string;
};
export type BannerType = {
  title: string;
  image_url: string;
  description: string;
  redirect_url?: string;
};
