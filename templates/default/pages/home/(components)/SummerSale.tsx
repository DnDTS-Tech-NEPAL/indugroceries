"use client";

import Image from "next/image";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { VisibleSection } from "@/components/ui/visibleSection";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";

export const SummerSale = () => {
  const router = useRouter();
  const { data: config } = useConfigQuery();
  const { data: summerSaleData } = useHomePageQuery();
  const saleType = config?.sale_type;

  return (
    <VisibleSection visibility={summerSaleData?.sale_visibility}>
      {saleType === "Full Image" ? (
        <Box
          px={{ base: "16px", lg: "24px", xl: "32px", "2xl": "40px" }}
          py={{ base: "24px", md: "32px", lg: "40px" }}
        >
          <Box
            borderRadius="xl"
            overflow="hidden"
            width="100%"
            aspectRatio={16 / 9}
            position="relative"
          >
            <Image
              src={summerSaleData.sale_image_url || config.company_details_url}
              alt="Sale Banner"
              fill
              objectFit="contain"
              quality={90}
            />
          </Box>
        </Box>
      ) : (
        <Box
          maxW={"7xl"}
          mx={"auto"}
          // px={{
          //   base: "16px",
          //   lg: "24px",
          //   xl: "32px",
          //   "2xl": "40px",
          // }}
        >
          <HStack
            borderRadius={"xl"}
            flexDirection={{
              base: "column-reverse",
              lg: "row",
            }}
            alignItems={{
              lg: "center",
            }}
            //justifyContent="space-between"
            gap={{
              base: "20px",
              lg: "32px",
            }}
            overflow={{
              lg: "hidden",
            }}
            height={{
              base: "full",
              lg: "450px",
              xl: "580px",
              "2xl": "660px",
            }}
            px={{
              base: "20px",
              md: "72px",
            }}
            py={{
              base: "76px",
              lg: 0,
            }}
            background="blue.400"
          >
            <VStack
              flex={1}
              alignItems={{
                base: "stretch",
                lg: "start",
              }}
              gap="0"
              py={{
                lg: "84px",
              }}
            >
              <Text variant="subtitle2" color="system.text.light.light">
                {summerSaleData.sale_subtitle}
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
                marginTop="12px"
                marginBottom="4px"
              >
                {summerSaleData.sale_title}
              </Heading>
              <Text
                variant={{
                  base: "paragraphSmall",
                  md: "paragraphRegular",
                }}
                width="full"
                maxWidth={{
                  lg: "420px",
                }}
                color="system.text.normal.light"
                textAlign={"justify"}
                whiteSpace="pre-line"
              >
                {summerSaleData.sale_description}
              </Text>

              <Button
                marginTop="32px"
                display={"none"}
                onClick={() => router.push(ROUTES.APP.PRODUCTS)}
                data-testid="Explore-now-button"
                borderRadius={"full"}
                variant="solid"
                px={"24px"}
              >
                Explore Now
              </Button>
            </VStack>

            <Box
              flex={{
                lg: 1,
              }}
              position="relative"
              width="full"
              maxWidth={{
                base: "400px",
                lg: "none",
              }}
              height={{
                base: "300px",
                lg: "90%",
              }}
              marginRight={{
                xl: "70px",
              }}
            >
              <Image
                src={
                  summerSaleData.sale_image_url || config.company_details_url
                }
                alt="Summer Sale"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </Box>
          </HStack>
        </Box>
      )}
    </VisibleSection>
  );
};
