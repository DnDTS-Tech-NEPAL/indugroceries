import { ConfigType } from "@/types";
import { generateColorsFromConfig } from "@/utils";
import { defineRecipe } from "@chakra-ui/react";

export const useTextareaRecipe = (config: ConfigType) => {
  const colors = generateColorsFromConfig(config);

  return defineRecipe({
    className: "chakra-input",
    base: {
      width: "100%",
      minHeight: "160px",
      borderRadius: "8px",
      color: "system.text.dark.light",
      outline: "none",
      _focus: {
        outline: "none !important",
        borderColor: "primary.300 !important",
      },
      border: `1px solid ${colors.primary[100].value} !important`,
      _placeholder: { color: "grey.300" },
      _invalid: {
        borderColor: "danger.100 !important",
        _focus: {
          borderColor: "danger.100 !important",
        },
      },
    },
  });
};
