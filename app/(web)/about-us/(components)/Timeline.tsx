import { TimelineProps } from "@/types";
import {
  Box,
  // Button,
  Flex,
  Heading,
  // Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCube } from "react-icons/fa";

export default function TimelineSection({ data }: TimelineProps) {
  const timelineData = data.timeline_points.map((timeline_points, index) => ({
    title: timeline_points,
    description: data.timeline_points_description[index],
  }));
  return (
    <Flex
      maxW={"7xl"}
      mx={"auto"}
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="flex-start"
      px={{ base: 6, md: 16 }}
      py={12}
      gap={8}
    >
      {/* Left Side */}
      <Box flex="1">
        <Text
          fontSize={{ base: "14px", lg: "16px" }}
          lineHeight={1.5}
          fontWeight="medium"
          mb={2}
        >
          {data.timeline_tagline}
        </Text>
        <Heading
          as="h2"
          fontSize={{ base: "36px", lg: "48px" }}
          lineHeight={1.2}
          py={{ base: "2", lg: "2" }}
          mb={6}
        >
          {data?.timeline_title}
        </Heading>
        {/* <Stack direction="row" gap={4}>
          <Button variant="outline">Button</Button>
          <Button bg={"white"} color={"black"}>
            Button
            <FaAngleRight />
          </Button>
        </Stack> */}
      </Box>

      {/* Right Side */}
      <Box flex="1" position="relative">
        <VStack align="start" gap={10} position="relative">
          {/* Vertical Line */}
          <Box
            position="absolute"
            left={`calc( 0.5rem - 1px)`}
            top="0"
            bottom={{
              base: "8.5rem",
              sm: "9rem",
              md: "7rem",
              lg: "9rem",
              xl: "7rem",
            }}
            width="2px"
            bg="gray.300"
            zIndex={0}
          />

          {timelineData.map((item, idx) => (
            <Flex key={idx} align="flex-start" gap={4}>
              {/* Icon */}
              <Box
                position="relative"
                zIndex="1"
                bg="white"
                boxSize="8"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaCube />
              </Box>
              {/* Content */}
              <Box>
                <Heading
                  as="h4"
                  fontSize={{ base: "16px", lg: "20px" }}
                  lineHeight={1.4}
                >
                  {item.title}
                </Heading>
                <Text
                  fontSize={{ base: "14px", lg: "16px" }}
                  lineHeight={1.5}
                  color="gray.600"
                  textAlign={"justify"}
                >
                  {item.description}
                </Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
