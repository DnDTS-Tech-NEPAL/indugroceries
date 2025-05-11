"use client";
import { useConfigQuery } from "@/hooks/api";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const SaafSection = () => {
  const { data: advertisements } = useConfigQuery();
  return (
    <Flex
      maxW={"7xl"}
      direction={{ base: "column", md: "row" }}
      // maxW={"1320px"}
      align="center"
      justify="space-around"
      bg="white"
      py={{ base: 8, md: 20 }}
      gap={{ base: 8, md: 10 }}
      mx={"auto"}
    >
      {/* Image Section */}
      <Box
        order={{ base: 2, md: 1 }}
        maxW={{ base: "100%", md: "50%" }}
        px={{ base: 4, md: 4 }}
      >
        <Image
          src={advertisements.advertisement_image_link}
          alt="Saaf Cleaning Products"
          borderRadius="md"
          boxShadow="lg"
          width={{ base: "100%", md: "612px" }}
          height={{ base: "auto", md: "640px" }}
          objectFit="cover"
        />
      </Box>
      {/* Content Section */}
      <Box
        order={{ base: 1, md: 2 }}
        flex={{ base: "1 1 100%", md: "1 1 50%" }}
        borderRadius="md"
        bg="white"
        p={{ base: 4, md: 6 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign={{ base: "start", md: "left" }}
      >
        <Heading
          as="h2"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "56px" }}
          lineHeight={1.2}
          mb={4}
        >
          {advertisements.advertisement_title}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mb={4} color="gray.600" textAlign={"justify"}>
          {advertisements.advertisement_description}
        </Text>
        <Stack direction={{ base: "row" }} gap={4} justify={"flex-start"}>
          <Button
            colorScheme="green"
            bgColor={"green.600"}
            borderRadius="md"
            width={{ base: "50%", sm: "auto" }}
            onClick={() =>
              window.open(advertisements.advertisement_button_link, "_blank")
            }
          >
            Visit Site
          </Button>
          <Button
            variant="outline"
            borderRadius="md"
            width={{ base: "50%", sm: "auto" }}
          >
            Learn More
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
