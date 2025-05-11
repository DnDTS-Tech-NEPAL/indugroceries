"use client";
import { WhychooseProps } from "@/types";
import { Box, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaGlobeAmericas,
  FaHandsHelping,
  FaLeaf,
  FaTruck,
} from "react-icons/fa";

const MotionBox = motion(Box);

export const WhyChooseUs = ({ data }: WhychooseProps) => {
  const icons = [FaGlobeAmericas, FaHandsHelping, FaLeaf, FaTruck];
  const features =
    data?.why_choose_us_points?.map((title: string, index: number) => ({
      title,
      description: data?.why_choose_us_points_description?.[index],
      icon: icons[index] || FaGlobeAmericas,
    })) || [];
  return (
    <Box
      as="section"
      px={{ base: 6, md: 12 }}
      pt={{ base: "80px", md: "100px" }}
      pb={{ base: "60px", md: "100px" }}
      mt={{ base: "60px", md: "100px" }}
      bg="gray.100"
    >
      <Heading
        fontSize={{ base: "28px", md: "36px", lg: "40px" }}
        fontWeight={700}
        textAlign="center"
        mb={{ base: 10, md: 6 }}
        color="gray.800"
      >
        {data?.why_choose_us_title}
      </Heading>
      <Text
        mb={12}
        textAlign="center"
        color="gray.700"
        fontSize={{ base: "md", md: "lg" }}
        maxW="3xl"
        mx="auto"
      >
        {data?.why_choose_us_description}
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 6, md: 10 }}>
        {features.map((feature, index) => (
          <MotionBox
            key={index}
            p={6}
            bg="white"
            borderRadius="xl"
            boxShadow="lg"
            whileHover={{ y: -6, boxShadow: "xl" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            maxW="1280px"
          >
            <Flex
              align="center"
              justify="center"
              boxSize={12}
              bg="primary.100"
              borderRadius="full"
              mb={4}
              color="primary.600"
              fontSize="24px"
            >
              <feature.icon />
            </Flex>

            <Heading fontSize="lg" mb={3} color="primary.600">
              {feature.title}
            </Heading>
            <Text
              fontSize="md"
              color="primary.600"
              textAlign={"justify"}
              hyphens="auto"
            >
              {feature.description}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};
