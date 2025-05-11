"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { Timer } from "@/components";
import { ROUTES } from "@/constants";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { VisibleSection } from "@/components/ui/visibleSection";

export const Offer = () => {
  const router = useRouter();
  const { data: config } = useConfigQuery();
  const { data: offerData } = useHomePageQuery();

  return (
    <>
      <VisibleSection visibility={offerData?.offer_visibility}>
        <Box
          px={{
            base: "20px",
            md: "40px",
          }}
        >
          <HStack
            position="relative"
            flexDirection={{
              base: "column",
              lg: "row",
            }}
            justifyContent="space-between"
            gap={{
              base: "24px",
            }}
            overflow="hidden"
            height={{
              lg: "660px",
            }}
            px={{
              base: "20px",
              md: "72px",
            }}
            background="orange.100"
          >
            <VStack
              alignItems="start"
              justifyContent="flex-end"
              gap="8px"
              width="full"
              maxWidth="600px"
              height="full"
              paddingTop="76px"
              paddingBottom={{
                lg: "100px",
              }}
            >
              <Text variant="subtitle2" color="system.text.light.light">
                {offerData.offer_subtitle}
              </Text>
              <Heading
                variant={{
                  base: "heading6",
                  md: "heading5",
                  lg: "heading4",
                  "2xl": "heading3",
                }}
                fontWeight="600"
                color="system.text.dark.light"
                marginTop={{
                  lg: "4px",
                }}
              >
                {offerData.offer_title}
              </Heading>
              <Text
                variant={{
                  base: "paragraphSmall",
                  md: "paragraphRegular",
                }}
              >
                {offerData.offer_description}
              </Text>

              <Timer date={offerData.duration} />

              <Button
                width={{
                  base: "full",
                  lg: "fit-content",
                }}
                onClick={() => router.push(ROUTES.APP.PRODUCTS)}
                data-testid="Shop-now-button"
                borderRadius={"full"}
                variant="solid"
                px={"24px"}
              >
                Shop Now
              </Button>
            </VStack>

            <Box
              position="relative"
              zIndex={1}
              flexShrink={0}
              width={{
                base: "full",
                lg: "450px",
                "2xl": "568px",
              }}
              height={{
                base: "400px",
                lg: "full",
              }}
              overflow="hidden"
            >
              <Box
                position="relative"
                width="full"
                maxWidth={{
                  base: "400px",
                  lg: "none",
                }}
                mx="auto"
                height={{
                  base: "full",
                  lg: "calc(100% - 100px)",
                }}
                transform={{
                  lg: "translateY(100px)",
                }}
              >
                <Image
                  src={offerData.offer_image_url || config.company_details_url}
                  alt=""
                  fill
                  objectFit="cover"
                  objectPosition="top"
                />
              </Box>

              <Box
                position="absolute"
                left="50%"
                zIndex={-1}
                top="0"
                display={{
                  base: "none",
                  lg: "block",
                }}
                transform="translate(-50%, -30%)"
                boxSize={{
                  base: "400px",
                  "2xl": "568px",
                }}
                borderRadius="full"
                background="orange.200"
              ></Box>
            </Box>
          </HStack>
        </Box>
      </VisibleSection>
    </>
  );
};
