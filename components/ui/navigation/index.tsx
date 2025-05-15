"use client";

import { Box, HStack } from "@chakra-ui/react";

import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/svg";
import { NavigationProps } from "@/types";

export const Navigation = ({ swiper, isBeginning, isEnd }: NavigationProps) => {
  return (
    <HStack gap={8}>
      <Box background={"#F8E1E7"} borderRadius={"full"} p={4} cursor="pointer">
        <ArrowLeftIcon
          style={{
            cursor: isBeginning ? "default" : "pointer",
            opacity: isBeginning ? 0.5 : 1,
          }}
          onClick={() => !isBeginning && swiper?.slidePrev()}
        />
      </Box>
      <Box background={"#F8E1E7"} borderRadius={"full"} p={4} cursor="pointer">
        <ArrowRightIcon
          style={{
            cursor: isEnd ? "default" : "pointer",
            opacity: isEnd ? 0.5 : 1,
          }}
          onClick={() => !isEnd && swiper?.slideNext()}
        />
      </Box>
    </HStack>
  );
};
