import { getAboutUsData } from "@/api";
import { Box, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { leaf, reliability, cultural, globe } from "@/assets/svg";

export const PartnerWithUs = async () => {
  const data = await getAboutUsData();
  const aboutUsData = data?.Data;
  const icons = [globe, cultural, leaf, reliability];
  const features =
    aboutUsData?.why_choose_us_points?.map((title: string, index: number) => ({
      title,
      description: aboutUsData?.why_choose_us_points_description?.[index],
      icon: icons[index] || globe,
    })) || [];
  return (
    <Box
      as="section"
      mx={"auto"}
      py={{ base: "2rem", md: "4rem" }}
      px={{ base: 6, md: 20 }}
      mt={{ base: "60px", md: "100px" }}
      bg="#E8F6ED"
    >
      <Box maxW="7xl" mx={"auto"}>
        <Heading
          fontSize={{ base: "28px", md: "36px", lg: "40px" }}
          fontWeight={700}
          textAlign="start"
          pb={{ base: 4, md: 6 }}
          color="gray.800"
        >
          {aboutUsData?.why_choose_us_title}
        </Heading>
        <Text
          mb={12}
          textAlign="center"
          color="gray.700"
          fontSize={{ base: "md", md: "lg" }}
          maxW="3xl"
          mx="auto"
        >
          {aboutUsData?.why_choose_us_description}
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          gap={{ base: 6, md: 10 }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              // p={4}
              gap={10}
              maxW="1280px"
            >
              <Flex
                align="center"
                justify="center"
                boxSize={8}
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
                fontSize={"md"}
                color="primary.600"
                textAlign={"justify"}
                hyphens="auto"
              >
                {feature.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
