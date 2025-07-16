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
            50: { value: "#FAFAFA" },
            100: { value: "#E9EAEB" },
            200: { value: "#D5D7DA" },
            300: { value: "#535862" },
            400: { value: "#0A0D12" },
            500: { value: "#3BB77E" },
          },
          danger: {
            100: { value: "#ff0000" },
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
                light: { value: "#141414" },
              },
              normal: {
                light: { value: "#252B37" },
                dark: { value: "#ebebeb" },
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
