"use client";
import { InfluencerHeroImage } from "@/assets/image";
import { Box, Flex, Heading, Text, Button, List } from "@chakra-ui/react";

import Image from "next/image";
import Link from "next/link";

export default function InfluencerPage() {
  return (
    <Box maxW={"7xl"} py={6} margin={"auto"} minH="100vh">
      {/* Hero Section */}
      <Box
        position="relative"
        h="400px"
        w="full"
        overflow="hidden"
        borderRadius="xl"
      >
        <Image
          src={InfluencerHeroImage}
          alt="Call for Influencer - Beauty products with dried flowers"
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
          px={4}
        >
          <Heading as="h1" size={{ base: "2xl", md: "3xl" }} mb={4}>
            Call for Influencer
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl">
            Share your love for K-beauty, receive exclusive products, and grow
            with a vibrant skincare community.
          </Text>
        </Flex>
      </Box>

      {/* Content Section */}
      <Box px={4} py={12}>
        {/* Become a KBP Influencer Section */}
        <Box mb={12}>
          <Heading as="h2" size="lg" color="gray.700" mb={6}>
            Become a KBP Influencer!
          </Heading>
          <Text fontSize="lg" color="gray.700" mb={4} lineHeight="relaxed">
            Love K-beauty? Passionate about skincare? Here&apos;s your chance to
            shine!
          </Text>
          <Text color="gray.600" lineHeight="relaxed">
            Join the KBP Influencer Program and become a key voice in
            Nepal&apos;s growing K-beauty community. As an influencer,
            you&apos;ll get the opportunity to try out and review some of the
            most loved Korean skincare products, receive exclusive discounts,
            and earn commissions while doing what you love. Whether you&apos;re
            a skincare enthusiast, content creator, or just someone who enjoys
            sharing beauty tips, we&apos;d love to collaborate and grow with
            you. Let&apos;s bring the best of Korean beauty to Nepal—together!
          </Text>
        </Box>

        {/* What You'll Get Section */}
        <Box mb={12}>
          <Heading as="h2" size="lg" color="gray.700" mb={6}>
            What You&apos;ll Get
          </Heading>
          <List.Root gap={2} mb={4}>
            <List.Item color="gray.700">
              A curated K-Beauty PR Box to review
            </List.Item>
            <List.Item color="gray.700">
              10-15% discount code for all your purchases
            </List.Item>
            <List.Item color="gray.700">
              Earn up to 5% commission every time someone uses your code
            </List.Item>
            <List.Item color="gray.700">
              Features on our social media (with full credit!)
            </List.Item>
            <List.Item color="gray.700">
              Plus, more exciting perks along the way!
            </List.Item>
          </List.Root>
        </Box>

        {/* How to Apply Section */}
        <Box mb={12}>
          <Heading as="h2" size="lg" color="gray.700" mb={6}>
            How to Apply
          </Heading>
          <Text color="gray.700" lineHeight="relaxed" mb={8}>
            Simply fill out our application form for a chance to be selected.
            We&apos;re excited to collaborate and grow together with inspiring
            content creators like you!
          </Text>

          <Link href="/influencer/apply" passHref>
            <Button
              as="a"
              colorScheme="pink"
              bg={"#FF6996"}
              size="lg"
              px={8}
              py={3}
              borderRadius="full"
              fontSize="lg"
              fontWeight="medium"
            >
              Apply Now
            </Button>
          </Link>
        </Box>

        {/* How to Apply Section */}
        <Box mb={12}>
          <Heading fontSize={"lg"} color="gray.700" mb={4}>
            Note *
          </Heading>
          <Box borderLeftWidth="3px" paddingX={6}>
            <Text color="gray.700" fontSize={"md"} lineHeight="relaxed">
              Please note: Due to limited availability, KBP reserves the right
              to the final decision. The K-Beauty Box contains pre-selected
              items.
            </Text>
            <Text color="gray.700" fontSize={"md"} lineHeight="relaxed">
              By joining, you consent to KBP sharing your content (with full
              credit) across our channels.
            </Text>
            <Text color="gray.700" fontSize={"md"} lineHeight="relaxed">
              All personal data collected will be handled with care and used
              only for legitimate purposes
            </Text>
          </Box>

          <Text color="gray.700" mt={12} fontSize={"md"} lineHeight="relaxed">
            Let&apos;s bring the best of Korean skincare to Nepal—together.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
