"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { useConfigQuery } from "@/hooks/api";
import { BannerCardProps } from "@/types";

const playfairDisplay = Playfair_Display({
  weight: ["700"],
  subsets: ["latin"],
});

export const BannerCard = ({
  background,
  title,
  description,
  buttonTitle,
  redirectLink,
  direction = "row",
  imageUrl,
}: BannerCardProps) => {
  const router = useRouter();
  const { data: config } = useConfigQuery();

  return (
    <Flex
      flexDirection={{
        base: "column",
        md: "row",
        xl: direction,
      }}
      alignItems="center"
      justifyContent="space-between"
      boxSize="full"
      background={background}
      overflow="hidden"
    >
      <VStack
        alignItems={{
          base: "flex-start",
          xl: direction === "row" ? "flex-start" : "center",
        }}
        gap="0"
        maxWidth={{
          base: "380px",
          xl: direction === "row" ? "320px" : "380px",
          "2xl": direction === "row" ? "480px" : "80%",
        }}
        padding={{
          base: "20px",
          md: "32px",
          lg: "40px",
        }}
        textAlign={{
          xl: direction === "row" ? "left" : "center",
        }}
        flexShrink={0}
      >
        <Heading
          variant={{
            base: "heading5",
            "2xl": "heading3",
          }}
          className={playfairDisplay.className}
          lineHeight={{
            "2xl": "40px",
          }}
        >
          {title}
        </Heading>
        <Text
          variant={{
            base: "paragraphSmall",
            md: "paragraphRegular",
          }}
          marginTop="8px"
          maxWidth="410px"
          color="system.text.normal.light"
        >
          {description}
        </Text>
        <Button
          display={"none"}
          variant="outline"
          marginTop="24px"
          width={{
            base: "full",
            md: "auto",
          }}
          onClick={() => router.push(redirectLink)}
        >
          {buttonTitle}
        </Button>
      </VStack>

      <Box
        position="relative"
        overflow="hidden"
        flexShrink={direction === "row" ? 0 : 1}
        width={{
          base: "full",
          md: "60%",
          lg: "50%",
          xl: direction === "row" ? "50%" : "70%",
        }}
        height={{
          base: "280px",
          md: "full",
        }}
      >
        <Image
          src={imageUrl || config.company_details_url}
          alt=""
          fill
          objectFit="cover"
          objectPosition="top left"
        />
      </Box>
    </Flex>
  );
};
