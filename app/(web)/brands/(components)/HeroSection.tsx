import { InfluencerHeroImage } from "@/assets/image";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      w="full"
      h={{ base: "200px", md: "300px", lg: "350px" }}
      bgImage={`url(${InfluencerHeroImage.src})`}
      bgSize="cover"
    backgroundPosition={"center"}
      borderRadius="lg"
      display="flex"
      alignItems="center"
    >
      <Container maxW="7xl" color="white" display={"flex"} flexDirection={"column"} alignItems={"center"} spaceY={3}>
        <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} mb={2}>
          Our Brands
        </Heading>
        <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} maxW="3xl">
          Explore our curated collection of top Korean beauty brands — trusted names
          that bring innovation, tradition, and radiant results to your skincare routine.
        </Text>
      </Container>
    </Box>
  );
}
