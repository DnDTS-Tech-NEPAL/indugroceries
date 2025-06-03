import { defineRecipe } from "@chakra-ui/react";

export const headingRecipe = defineRecipe({
  base: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "bold",
  },
  variants: {
    variant: {
      heading1: {
        fontWeight: 700,
        fontSize: "67px",
        lineHeight: "80.4px",
      },
      heading2: {
        fontWeight: 700,
        fontSize: "50px",
        lineHeight: "60px",
      },
      heading3: {
        fontWeight: 600,
        fontSize: "37px",
        lineHeight: "44.4px",
      },
      heading4: {
        fontWeight: 600,
        fontSize: "28px",
        lineHeight: "27.6px",
      },
      heading5: {
        fontWeight: 600,
        fontSize: "21px",
        lineHeight: "24px",
      },
      heading6: {
        fontWeight: 500,
        fontSize: "18px",
        lineHeight: "21.6px",
      },
      heading7: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "21.6px",
      },
    },
  },
  defaultVariants: {
    variant: "heading4",
  },
});
