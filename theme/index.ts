import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { ConfigType } from "@/types";
// import { generateColorsFromConfig } from "@/utils";

import {
  badgeRecipe,
  buttonRecipe,
  headingRecipe,
  textRecipe,
  useInputRecipe,
  useTextareaRecipe,
} from "./components";

const customConfig = defineConfig({
  globalCss: {
    body: {
      color: "primary.400",
    },
    "a:focus": {
      outline: "none",
    },
    ".chakra-radio-group__itemText": {
      width: "full",
    },
  },
  theme: {
    tokens: {
      colors: {},
    },
    recipes: {
      badge: badgeRecipe,
      button: buttonRecipe,
      heading: headingRecipe,
      text: textRecipe,
    },
  },
});

const chakraSystem = createSystem(defaultConfig, customConfig);
export default chakraSystem;

export const createDynamicChakraSystem = (config: ConfigType) => {
  const inputRecipe = useInputRecipe(config);
  const textareaRecipe = useTextareaRecipe(config);

  const dynamicConfig = defineConfig({
    globalCss: {
      body: {
        color: "primary.500",
      },
      "a:focus": {
        outline: "none",
      },
      ".chakra-radio-group__itemText": {
        width: "full",
      },
    },
    theme: {
      tokens: {
        colors: {
          primary: {
            default: { value: "#3BB77E" },
            50: { value: "#e6f5ef" },
            100: { value: "#bfe5cd" },
            200: { value: "#99d7b0" },
            300: { value: "#66c68b" },
            400: { value: "#3bb77e" },
            500: { value: "#319a6a" },
            600: { value: "#277d56" },
            700: { value: "#1c5f3e" },
            800: { value: "#12412b" },
            900: { value: "#092518" },
          },
          danger: {
            100: { value: "#EF302D" },
          },
          grey: {
            100: { value: "#f5f5f5" },
            200: { value: "#F9F9F9" },
            300: { value: "#8A91A1" },
            400: { value: "#fcfcfc" },
            500: { value: "#d4d4d4" },
          },
          orange: {
            100: { value: "#F4FFD5" },
            200: { value: "#EDFFBD" },
          },
          blue: {
            100: { value: "#F1FFF2" },
            200: { value: "#E8F3FF" },
            300: { value: "#E8F3FF" },
            400: { value: "#F4FAFF" },
          },
          system: {
            neutral: {
              separator: {
                light: { value: "#E9EAEB" },
              },
              info: {
                light: { value: "#0bc5ea" },
              },
              background: {
                dark: { value: "#121212" },
              },
            },
            text: {
              dark: {
                light: { value: "#ebebeb" },
              },
              normal: {
                light: { value: "#252B37" },
                dark: { value: "#141414" },
              },
              light: {
                light: { value: "#535862" },
                dark: { value: "#858585" },
              },
            },
          },
        },
      },
      recipes: {
        badge: badgeRecipe,
        button: buttonRecipe,
        heading: headingRecipe,
        input: inputRecipe,
        text: textRecipe,
        textarea: textareaRecipe,
      },
    },
  });

  return createSystem(defaultConfig, dynamicConfig);
};
