"use client";
import { useCallForinfluencer } from "@/hooks/api";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  List,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function InfluencerPage() {
  // Responsive values
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const subTextSize = useBreakpointValue({ base: "lg", md: "xl" });
  const contentPadding = useBreakpointValue({ base: 4, md: 10 });
  const heroHeight = useBreakpointValue({ base: "300px", md: "400px" });
  const { data: pageData } = useCallForinfluencer();

  return (
    <Box
      maxW={"7xl"}
      py={{ base: 4, md: 6 }}
      margin={"auto"}
      minH="100vh"
      px={{ base: 2, md: 0 }}
    >
      {/* Hero Section */}
      <Box
        position="relative"
        h={heroHeight}
        w="full"
        overflow="hidden"
        borderRadius={{ base: "md", md: "xl" }}
      >
        <Image
          src={pageData?.hero_image_link}
          alt={pageData?.hero_title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box position="absolute" inset={0} bg="blackAlpha.600" />
        <Flex
          position="absolute"
          inset={0}
          direction="column"
          align="center"
          justify="center"
          color="white"
          textAlign="center"
          px={{ base: 4, md: 8 }}
        >
          <Heading as="h1" fontSize={headingSize} mb={{ base: 3, md: 4 }}>
            {pageData?.hero_title}
          </Heading>
          <Text
            fontSize={subTextSize}
            maxW={{ base: "100%", md: "2xl" }}
            px={{ base: 2, md: 0 }}
          >
            {pageData?.hero_description}
          </Text>
        </Flex>
      </Box>

      {/* Content Section */}
      <Box px={{ base: 4, md: contentPadding }} py={{ base: 8, md: 12 }}>
        {/* Become a KBP Influencer Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading as="h2" size="lg" color="gray.700" mb={{ base: 4, md: 6 }}>
            {pageData?.title}
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.700"
            mb={4}
            lineHeight="relaxed"
          >
            {pageData?.infuencer_description}
          </Text>
          <Text
            color="gray.600"
            lineHeight="relaxed"
            fontSize={{ base: "sm", md: "md" }}
          >
            {pageData?.paragraph_description}
          </Text>
        </Box>

        {/* What You'll Get Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading as="h2" size="lg" color="gray.700" mb={{ base: 4, md: 6 }}>
            {pageData?.points_title}
          </Heading>
          <List.Root gap={2} mb={4} ml={5}>
            {pageData?.points.map((item, index) => (
              <List.Item
                key={index}
                color="gray.700"
                fontSize={{ base: "sm", md: "md" }}
              >
                {item.data_iuai}
              </List.Item>
            ))}
          </List.Root>
        </Box>

        {/* How to Apply Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading as="h2" size="lg" color="gray.700" mb={{ base: 4, md: 6 }}>
            {pageData?.apply_title}
          </Heading>
          <Text
            color="gray.700"
            lineHeight="relaxed"
            mb={8}
            fontSize={{ base: "sm", md: "md" }}
          >
            {pageData?.apply_description}
          </Text>

          <Link href="/call-for-influencer/apply" passHref>
            <Button
              as="a"
              colorScheme="pink"
              bg={"#FF6996"}
              size={{ base: "md", md: "lg" }}
              px={{ base: 6, md: 8 }}
              py={{ base: 2, md: 3 }}
              borderRadius="full"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="medium"
              width={{ base: "full", md: "auto" }}
            >
              Apply Now
            </Button>
          </Link>
        </Box>

        {/* Note Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading fontSize={{ base: "md", md: "lg" }} color="gray.700">
            Note *
          </Heading>
          <Box
            borderLeftWidth="3px"
            pl={{ base: 4, md: 6 }}
            ml={{ base: 2, md: 0 }}
          >
            <Text
              color="gray.700"
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="relaxed"
              mb={2}
              whiteSpace="pre-line"
            >
              {pageData?.note}
            </Text>
          </Box>

          <Text
            color="gray.700"
            mt={{ base: 8, md: 12 }}
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="relaxed"
          >
            {pageData?.footer}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
