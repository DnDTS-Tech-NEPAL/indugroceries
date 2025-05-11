"use client";
import { useQualityCompliancePageQuery } from "@/hooks/api/(web)/qualityCompliance";
import { useRegisterDialogStore } from "@/store";
import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
export default function HeroSection() {
  const { data: qualityData } = useQualityCompliancePageQuery();
  const { updateSignUpOpen } = useRegisterDialogStore();
  return (
    <Box
      position="relative"
      width="100%"
      height={{ base: "90dvh", md: "60dvh" }}
      bgImage={`url(${qualityData?.hero_image_link})`}
      bgSize="cover"
      bgPos="center"
      overflow="hidden"
    >
      {/* Dark overlay */}
      <Box position="absolute" inset="0" bg="blackAlpha.600" zIndex={1} />

      {/* Content */}
      <Box
        position="relative"
        zIndex={2}
        maxW={"7xl"}
        mx="auto"
        px={{ base: 6, md: 10 }}
        py={10}
        height="100%"
        display="flex"
        alignItems="center"
      >
        <Flex flexWrap="wrap" justifyContent="space-between" color="white">
          <Heading
            as="h1"
            w={{ base: "full", lg: "50%" }}
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            lineHeight="1.2"
            pb={5}
          >
            {qualityData?.hero_title}
          </Heading>
          <Box w={{ base: "full", lg: "50%" }}>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              opacity={0.9}
              textAlign="justify"
            >
              {qualityData?.hero_description}
            </Text>
            <HStack gap={4} mt="18px">
              <Button
                colorScheme="green"
                bg="#16CA5E"
                color="white"
                borderRadius="6px"
                onClick={() => updateSignUpOpen(true)}
                _hover={{ bg: "#14b955" }}
              >
                Partner With Us
              </Button>
            </HStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
