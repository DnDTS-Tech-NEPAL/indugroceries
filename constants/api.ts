export const API_ROUTES = {
  AUTH: {
    LOGIN: "frappe.val.api.login",
    REGISTER: "signup",
    SET_PASSWORD: "resetpassword",
    RESEND_OTP: "resendotp",
    FORGOT_PASSWORD: {
      GET_OTP: "forgotpasswordgetotp",
      OTP_CHECK: "forgotpasswordotpcheck",
      CHANGE_PASSWORD: "changepw",
    },
  },

  APP: {
    MENU_NAV:"megamenu",
    CONFIG: "websiteconfig",
    FAQ: "faq",
    SAAF:"singlebrand",
    SKIN_TEST:"quizpage",
    SKIN_TYPE:"skintype",
    QUALITY:"quality",
    CALL_FOR_INFLUENCER:"influencerpage",

    HOMEPAGE: "homepage",
    FEATURED_CATEGORY: "featuredcategories",
    FEATURED_BRAND: "featuredbrands",

    PRODUCTS: {
      FILTER: "itemflags",
      LIST: "item_list",
      SEARCH: "item_search",
      OFFER: "offeritems",

      NEW_ARRIVALS: "newarrivals",
      BEST_SELLERS: "bestseller",

      PRODUCTS_LIKE: "productslike",
      ITEM_PRODUCTS_LIKE: "itemproductslike",

      REVIEW_DATA: "reviewdata",
      REVIEW: "review",
      PAYMENT_METHOD: "modeofpayment",

      WISHLIST: {
        ADD: "postwishlist",
        GET: "wishlistdata",
        REMOVE: "removewishlist",
        COUNT: "wishlistdatacount",
      },

      CART: {
        ADD: "postcart",
        ADD_NEW: "postcartcheckout",
        GET: "cartdata",
        REMOVE: "removecart",
        COUNT: "cartdatacount",
      },

      INDIVIDUAL_PRODUCT: {
        GET: "individualitem",
        RECENTLY_VIEWED:"addrecentlyviewed",
      },
    },

    CATEGORIES: {
      LIST: "items_group",
    },

    BRANDS: {
      LIST: "fetchbrands",
    },

    ABOUT_US: "about_us",

    CONTACT_US: {
      DETAIL: "contact-us",
      SUBMIT: "contact-us-post",
    },
    TERMS_AND_CONDITION: {
      LIST: "terms",
    },
    PRIVACY_POLICY: {
      LIST: "privacy",
    },
    RETURN_POLICY: {
      LIST: "return",
    },
    ORDER: {
      POST: "orderpost",
      LIST: "orderlist",
      DELIVERY: "deliverycharges",
    },
    PROMO: {
      POST: "couponcalculation",
      GET: "couponcalculation",
    },
  },

  USER: {
    PROFILE: {
      GET: "userdetail",
    },
  },
};

export const NEXT_API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    SET_PASSWORD: "/api/auth/setpassword",
    RESEND_OTP: "api/auth/resendotp",
    FORGOT_PASSWORD: {
      GET_OTP: "api/auth/forgotpassword/getotp",
      OTP_CHECK: "api/auth/forgotpassword/checkotp",
      CHANGE_PASSWORD: "api/auth/forgotpassword/changepassword",
    },
  },
};
