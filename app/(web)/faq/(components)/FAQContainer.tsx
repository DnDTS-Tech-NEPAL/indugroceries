"use client";
import {
  Box,
  Text,
  Stack,
  VStack,
  Heading,

  // useBreakpointValue,
} from "@chakra-ui/react";

import { AccordionRoot, PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { FAQContainerProps } from "@/types";

import { FAQItem } from "./FAQItem";

export const FAQContainer = ({ faqData }: FAQContainerProps) => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="FAQ's"
        breadcrumb={BREADCRUMB_CONFIG.FAQ}
      />
      <Box
        bg="gray.50"
        px={{ base: 4, md: 8, lg: 12 }}
        py={{ base: 6, md: 10, xl: 16 }}
      >
        {/* Left Side - Heading and Text */}
        <Stack flex="1" gap={4}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="semibold"
            mb="2rem"
          >
            {faqData?.heading_1}
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.500"
            width={"90%"}
          >
            {faqData?.subheading}
          </Text>
        </Stack>
        {/* Right Side - Accordion */}
        <Box
          flex="1"
          borderTop="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
        >
          <AccordionRoot collapsible as={VStack} alignItems="stretch" gap={4}>
            {faqData?.faq_table?.map((item) => (
              <FAQItem key={item.idx} {...item} />
            ))}
          </AccordionRoot>
        </Box>
      </Box>
    </>
  );
};
