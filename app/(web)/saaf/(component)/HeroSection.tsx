"use client";
import { useSaafPageQuery } from "@/hooks/api/(web)/saaf";
import { useRegisterDialogStore } from "@/store";
import { Box, Flex, Heading, Text, Button, Container } from "@chakra-ui/react";

export default function HeroSection() {
  const { data: saafData } = useSaafPageQuery();
  const { updateSignUpOpen } = useRegisterDialogStore();
  return (
    <Box
      position="relative"
      width="100%"
      height={{ base: "500px", md: "600px", lg: "700px" }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgImage={`url(${saafData?.hero_image})`}
        bgSize="cover"
        bgPos="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        fontSize="xl"
        fontWeight="bold"
      ></Box>

      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.3)"
      />

      {/* Content */}
      <Container
        maxW="container.xl"
        height="100%"
        position="relative"
        display="flex"
        alignItems="center"
      >
        <Flex
          direction="column"
          color="white"
          maxW={{ base: "100%", md: "60%", lg: "50%" }}
          gap={4}
          px={{ base: 4, md: 0 }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            textShadow="0 2px 4px rgba(0,0,0,0.3)"
          >
            {saafData?.title}
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="medium"
            mt={2}
            textShadow="0 1px 2px rgba(0,0,0,0.3)"
          >
            {saafData?.description}
          </Text>

          <Flex gap={4} direction={{ base: "column", sm: "row" }}>
            <Button
              color="white"
              bg="#16CA5E"
              borderRadius={"md"}
              alignSelf={{ base: "stretch", sm: "start" }}
              onClick={() => updateSignUpOpen(true)}
              _hover={{ bg: "#14b955" }}
              zIndex={2} // Ensure buttons are above overlay
            >
              Partner With Us
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
