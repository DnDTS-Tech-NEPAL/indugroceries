"use client";

import parse from "html-react-parser";
import { useParams } from "next/navigation";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  VisibleContentSection,
} from "@/components";
import { useProductDetailByNameQuery } from "@/hooks/api";
import { ShadeSelector } from "./ShadeSelector";

export const ProductDescription = () => {
  const params = useParams();
  const productName = params.productName as string;

  const { data: productDetail } = useProductDetailByNameQuery(productName);

  return (
    <Box padding={{ base: "0", md: "20px 0px" }}>
      {/* Accordion for medium and larger screens */}
      {/* product description section */}
      {/* <VisibleContentSection
        content={`${productDetail?.custom_specifications}`}
      >
        <AccordionRoot
          collapsible
          as={VStack}
          alignItems="stretch"
          padding={{ base: "0", md: "20px 0px" }}
          borderBottom={{ base: 0, md: "1px solid" }}
          borderColor={{ md: "system.neutral.separator.light" }}
          gap={4}
          display={{ base: "none", md: "flex" }}
          defaultValue={["product_description"]}
        >
          <AccordionItem
            value="product_description"
            padding="0"
            background="white"
            border="0"
          >
            <AccordionItemTrigger padding="0">
              <Heading variant="heading6" color="primary.400">
                Description
              </Heading>
            </AccordionItemTrigger>

            <AccordionItemContent paddingTop="20px" paddingBottom="0">
              <Text variant="paragraphRegular">
                {parse(`${productDetail?.custom_specifications}`)}
              </Text>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </VisibleContentSection> */}

      <ShadeSelector />
      {/* product feature section */}
      <VisibleContentSection content={`${productDetail?.custom_key_features}`}>
        <AccordionRoot
          collapsible
          as={VStack}
          alignItems="stretch"
          gap={4}
          display={{ base: "none", md: "flex" }}
          defaultValue={["product_description"]}
        >
          <AccordionItem
            value="product_description"
            padding="0"
            background="white"
            border="0"
          >
            {/* uncomment below content when feature is available */}
            <AccordionItemTrigger padding="0" mt={4}>
              <Heading variant="heading6" color="primary.400">
                Why We Love It
              </Heading>
            </AccordionItemTrigger>

            <AccordionItemContent paddingTop="20px" paddingBottom="10px">
              <Text variant="paragraphRegular">
                {parse(`${productDetail?.custom_key_features}`)}
              </Text>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </VisibleContentSection>
      {/* VStack for smaller screens */}

      <VStack align="stretch" gap="12px" display={{ base: "flex", md: "none" }}>
        <VisibleContentSection
          content={`${productDetail?.custom_specifications}`}
        >
          <Heading variant="heading6" color="primary.400">
            Description
          </Heading>
          <Text variant="paragraphSmall" lineHeight="28px">
            {parse(`${productDetail?.custom_specifications}`)}
          </Text>
        </VisibleContentSection>
        <VisibleContentSection
          content={`${productDetail?.custom_key_features}`}
        >
          <Heading variant="heading6" color="primary.400">
            Feature
          </Heading>
          <Text variant="paragraphSmall" lineHeight="28px">
            {parse(`${productDetail?.custom_key_features}`)}
          </Text>
        </VisibleContentSection>
      </VStack>
    </Box>
  );
};
