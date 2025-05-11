import { MvvProps } from "@/types";
import { Box, Flex, Heading, Text, VStack, Image } from "@chakra-ui/react";

const MissionVisionValues = ({ data }: MvvProps) => {
  return (
    <Box maxW={"7xl"} mx={"auto"} py={{ base: "10", md: "20" }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={10}
        px={{ base: "6", md: "10" }}
      >
        {/* Left Section */}
        <VStack align="center" gap={6} flex="1">
          <Box pl={2}>
            <Heading
              fontSize={{ base: "25px", md: "32px" }}
              lineHeight={1.4}
              mb={2}
            >
              {data?.mission_title}
            </Heading>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight={1.4}
              textAlign={"justify"}
            >
              {data?.mission_description}
            </Text>
          </Box>

          <Box pl={2}>
            <Heading
              fontSize={{ base: "25px", md: "32px" }}
              lineHeight={1.4}
              mb={2}
            >
              {data?.vision_title}
            </Heading>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight={1.4}
              textAlign={"justify"}
            >
              {data?.vision_description}
            </Text>
          </Box>

          <Box pl={2}>
            <Heading
              fontSize={{ base: "25px", md: "32px" }}
              lineHeight={1.4}
              mb={2}
            >
              {data?.values_title}
            </Heading>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight={1.5}
              textAlign={"justify"}
            >
              {data?.values_description}
            </Text>
          </Box>
        </VStack>

        {/* Right Section */}
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          borderRadius={"md"}
          justifyContent="center"
        >
          <Image
            src={data?.mission_image}
            alt="Placeholder"
            height={"640px"}
            borderRadius={"md"}
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default MissionVisionValues;
