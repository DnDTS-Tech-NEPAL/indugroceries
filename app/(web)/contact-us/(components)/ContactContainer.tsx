"use client";

import { PropsWithChildren } from "react";
import { Box, Flex } from "@chakra-ui/react";

export const ContactContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box
      px={{
        base: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
      }}
    >
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        maxWidth={"1280px"}
        mx={"auto"}
        gap={{ md: "20px", lg: "40px", xl: "60px" }}
        alignItems={"stretch"}
        py={{ base: "24px", lg: "32px", "2xl": "56px" }}
        px={{
          base: "20px",
          lg: "0",
        }}
      >
        {children}
      </Flex>
    </Box>
  );
};
