import { JourneyProps } from "@/types";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

export default function Journey({ data }: JourneyProps) {
  return (
    <Box
      maxW="7xl"
      px={{ base: 4, sm: 6, md: 10 }}
      py={{ base: 10, md: 16 }}
      mx="auto"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 10 }}
        align="start"
        justify="space-between"
      >
        <Heading
          as="h1"
          fontSize={{ base: "32px", lg: "40px" }}
          lineHeight="1.2"
          width={{ base: "full", md: "70%" }}
          fontWeight="bold"
          flex="1"
        >
          {data?.journey_title}
        </Heading>

        <Text
          flex="1"
          fontSize={{ base: "sm", sm: "md", md: "lg" }}
          lineHeight="tall"
          color="gray.700"
          textAlign={"justify"}
        >
          {data?.journey_description}
        </Text>
      </Stack>
    </Box>
  );
}
