import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: 500,
    fontSize: "16px",
    minH: "44px",
    px: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "0",
  },
  variants: {
    variant: {
      primary: {
        bg: "primary.400",
        color: "primary.50",
      },
      outline: {
        bg: "transparent",
        border: "1px solid",
        color: "primary.400",
        _hover: {
          bg: "transparent",
        },
      },
      ghost: {
        bg: "grey.100",
        color: "primary.400",
      },
      danger: {
        bg: "#FFE0E0",
        color: "danger.100",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
