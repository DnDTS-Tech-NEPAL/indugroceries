import { defineRecipe } from "@chakra-ui/react";

export const textRecipe = defineRecipe({
  base: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  },
  variants: {
    variant: {
      // sub titles
      subtitle1: {
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "19.2px",
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "16.8px",
      },
      subtitle3: {
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16.8px",
      },

      // paragraphs
      paragraphLarge: {
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "27px",
      },
      paragraphRegular: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "24px",
      },
      paragraphSmall: {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "21px",
      },
    },
  },
  defaultVariants: {},
});
