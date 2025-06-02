"use client";
import { InfluencerHeroImage } from "@/assets/image";
import { Box, Flex, Heading, Text, Button, List, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function InfluencerPage() {
  // Responsive values
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const subTextSize = useBreakpointValue({ base: "lg", md: "xl" });
  const contentPadding = useBreakpointValue({ base: 4, md: 10 });
  const heroHeight = useBreakpointValue({ base: "300px", md: "400px" });

  return (
    <Box maxW={"7xl"} py={{ base: 4, md: 6 }} margin={"auto"} minH="100vh" px={{ base: 2, md: 0 }}>
      {/* Hero Section */}
      <Box
        position="relative"
        h={heroHeight}
        w="full"
        overflow="hidden"
        borderRadius={{ base: "md", md: "xl" }}
       
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
          px={{ base: 4, md: 8 }}
        >
          <Heading as="h1" fontSize={headingSize} mb={{ base: 3, md: 4 }}>
            Call for Influencer
          </Heading>
          <Text fontSize={subTextSize} maxW={{ base: "100%", md: "2xl" }} px={{ base: 2, md: 0 }}>
            Share your love for K-beauty, receive exclusive products, and grow
            with a vibrant skincare community.
          </Text>
        </Flex>
      </Box>

      {/* Content Section */}
      <Box px={{ base: 4, md: contentPadding }} py={{ base: 8, md: 12 }}>
        {/* Become a KBP Influencer Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading as="h2" size="lg" color="gray.700" mb={{ base: 4, md: 6 }}>
            Become a KBP Influencer!
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" mb={4} lineHeight="relaxed">
            Love K-beauty? Passionate about skincare? Here&apos;s your chance to
            shine!
          </Text>
          <Text color="gray.600" lineHeight="relaxed" fontSize={{ base: "sm", md: "md" }}>
            Join the KBP Influencer Program and become a key voice in
            Nepal&apos;s growing K-beauty community. As an influencer,
            you&apos;ll get the opportunity to try out and review some of the
            most loved Korean skincare products, receive exclusive discounts,
            and earn commissions while doing what you love.
          </Text>
        </Box>

        {/* What You'll Get Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading as="h2" size="lg" color="gray.700" mb={{ base: 4, md: 6 }}>
            What You&apos;ll Get
          </Heading>
          <List.Root gap={2} mb={4}>
            {[
              "A curated K-Beauty PR Box to review",
              "10-15% discount code for all your purchases",
              "Earn up to 5% commission every time someone uses your code",
              "Features on our social media (with full credit!)",
              "Plus, more exciting perks along the way!"
            ].map((item, index) => (
              <List.Item key={index} color="gray.700" fontSize={{ base: "sm", md: "md" }}>
                {item}
              </List.Item>
            ))}
          </List.Root>
        </Box>

        {/* How to Apply Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <Heading as="h2" size="lg" color="gray.700" mb={{ base: 4, md: 6 }}>
            How to Apply
          </Heading>
          <Text 
            color="gray.700" 
            lineHeight="relaxed" 
            mb={8}
            fontSize={{ base: "sm", md: "md" }}
          >
            Simply fill out our application form for a chance to be selected.
            We&apos;re excited to collaborate and grow together with inspiring
            content creators like you!
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
          <Heading fontSize={{ base: "md", md: "lg" }} color="gray.700" mb={4}>
            Note *
          </Heading>
          <Box borderLeftWidth="3px" pl={{ base: 4, md: 6 }} ml={{ base: 2, md: 0 }}>
            {[
              "Please note: Due to limited availability, KBP reserves the right to the final decision. The K-Beauty Box contains pre-selected items.",
              "By joining, you consent to KBP sharing your content (with full credit) across our channels.",
              "All personal data collected will be handled with care and used only for legitimate purposes"
            ].map((text, index) => (
              <Text 
                key={index} 
                color="gray.700" 
                fontSize={{ base: "sm", md: "md" }} 
                lineHeight="relaxed"
                mb={2}
              >
                {text}
              </Text>
            ))}
          </Box>

          <Text 
            color="gray.700" 
            mt={{ base: 8, md: 12 }} 
            fontSize={{ base: "sm", md: "md" }} 
            lineHeight="relaxed"
          >
            Let&apos;s bring the best of Korean skincare to Nepal—together.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}