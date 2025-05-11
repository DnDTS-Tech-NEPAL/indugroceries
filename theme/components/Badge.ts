import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  base: {
    borderRadius: "8px",
    height: "38px",
    fontWeight: 400,
    fontSize: "14px",
    p: "10px 12px 10px 12px",
  },
  variants: {
    variant: {
      primary: {
        bg: "#E6FAEE",
        color: "#00CC29",
      },
      solid: {
        bg: "#FAE6E6",
        color: "#FF0000",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
