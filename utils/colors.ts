import { ConfigType } from "@/types";

export const generateColorsFromConfig = (config: ConfigType) => {
  config = config || {}; // to pass the test cases

  return {
    primary: {
      50: { value: config.primary_50 }, // #FAFAFA
      100: { value: config.primary_100 }, // #E9EAEB
      200: { value: config.primary_200 }, // #D5D7DA
      300: { value: config.primary_300 }, // #535862
      400: { value: config.primary_400 }, // #0A0D12
      500: { value: config.hero_bg },
    },
    danger: {
      100: { value: "#ff0000" },
    },
    grey: {
      100: { value: config.grey_100 }, // #f5f5f5
      200: { value: config.grey_200 }, // #F9F9F9
      300: { value: config.grey_300 }, // #8A91A1
      400: { value: "#fcfcfc" },
      500: { value: "#d4d4d4" },
    },
    orange: {
      100: { value: config.offer_section_light }, // #F4FFD5
      200: { value: config.offer_section_dark }, // #EDFFBD
    },
    blue: {
      100: { value: config.banner_100 }, // #F1FFF2
      200: { value: config.banner_200 }, // #E8F3FF
      300: { value: "#E8F3FF" },
      400: { value: config.sale_backgound },
    },
    system: {
      neutral: {
        separator: {
          light: { value: config.separator_light }, // #E9EAEB
        },
        info: {
          light: { value: config.info_light }, // #0bc5ea
        },
        background: {
          dark: { value: config.background_dark }, // #121212
        },
      },
      text: {
        dark: {
          light: { value: config.text_dark }, // #141414
        },
        normal: {
          light: { value: config.normal_text_light }, // #252B37
          dark: { value: config.normal_text_dark }, // #ebebeb
        },
        light: {
          light: { value: "#535862" },
          dark: { value: "#858585" },
        },
      },
    },
  };
};
