import { ROUTES } from "@/constants";

export const BREADCRUMB_CONFIG = {
  ABOUT_US: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "About Us", href: ROUTES.DEFAULT },
  ],
  CART: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Cart", href: ROUTES.USER.CART },
  ],
  CATEGORY: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "All Products", href: ROUTES.DEFAULT },
  ],
  CONTACT_US: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Contact Us", href: ROUTES.DEFAULT },
  ],
  FAQ: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "FAQ's", href: ROUTES.DEFAULT },
  ],
  FAVORITE: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Favorite", href: ROUTES.USER.FAVORITE },
  ],
    CHECKOUT: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Checkout", href: ROUTES.USER.CHECKOUT },
  ],
    WISHLIST: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Wishlist", href: ROUTES.USER.WISHLIST },
  ],
  PAYMENT: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Cart", href: ROUTES.DEFAULT },
  ],
  PRODUCTS: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "All Products", href: ROUTES.DEFAULT },
  ],
    BRANDS: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "All Brands", href: ROUTES.DEFAULT },
  ],
  PRODUCT_DETAIL: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "All Products", href: ROUTES.APP.SKINTYPE },
    { label: "Detail", href: ROUTES.DEFAULT },
  ],
   SKINTYPE_DETAIL: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "All Products", href: ROUTES.APP.PRODUCTS },
    { label: "Detail", href: ROUTES.DEFAULT },
  ],
  PROFILE: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Profile", href: ROUTES.DEFAULT },
  ],
  Privacy_Policy: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Privacy", href: ROUTES.APP.PRIVACY },
  ],
  RETURN_Policy: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Return-policy", href: ROUTES.APP.RETURN },
  ],
  TERMS_AND_CONDITION: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Terms-and-condition", href: ROUTES.APP.TERMS },
  ],
   CALL_FOR_INFLUENCER: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Call For Influencer", href: ROUTES.APP.INFLUENCER },
  ],
     SKIN_TEST_QUIZ: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Skin Test Quiz", href: ROUTES.APP.QUIZ },
  ],
    RECOMMEND_PRODUCTS: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Recommend Products", href: ROUTES.APP.RECOMMEND },
  ],
   OFFER: [
    { label: "Home", href: ROUTES.APP.HOMEPAGE },
    { label: "Offer Products", href: ROUTES.APP.OFFER },
  ],
};
