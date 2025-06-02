"use client";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";

export default function ProductShowcase() {
  const { data: ShowcaseData } = useConfigQuery();

  return (
    <Box py={{ base: 6, md: 8, lg: 10 }} px={{ base: 4, sm: 6, md: 8 }} maxW="7xl" mx="auto">
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 4, md: 6 }}>
        {/* Left Section: Two Large Horizontal Images */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          flex={{ base: "1", lg: "2" }} 
          gap={{ base: 4, md: 6 }}
        >
          <Link
            href={ShowcaseData?.banner_4_image_redirect_link || "#"}
            flex="1"
            height={{ 
              base: "200px", 
              sm: "250px", 
              md: "350px", 
              lg: "450px" 
            }}
          >
            <Image
              src={
                ShowcaseData?.banner_1_image_link
              }
              alt="Lipsticks"
              objectFit="cover"
              objectPosition={"left"}
              width="100%"
              height="100%"
              borderRadius="lg"
              boxShadow="md"
            />
          </Link>

          <Link
            href={ShowcaseData?.banner_3_image_redirect_link || "#"}
            flex="1"
            height={{ 
              base: "200px", 
              sm: "250px", 
              md: "350px", 
              lg: "450px" 
            }}
          >
            <Image
              src={
                ShowcaseData?.banner_2_image_link 
              }
              alt="Skincare"
              objectFit="cover"
              objectPosition={"left"}
              width="100%"
              height="100%"
              borderRadius="lg"
              boxShadow="md"
            />
          </Link>
        </Flex>

        {/* Right Section: Two Vertical Images */}
        <Flex 
          direction="column" 
          flex={{ base: "1", lg: "1" }} 
          gap={{ base: 4, md: 6 }}
          mt={{ base: 4, lg: 0 }}
        >
          <Link
            href={ShowcaseData?.banner_3_image_redirect_link || "#"}
            height={{ 
              base: "150px", 
              sm: "200px", 
              md: "210px", 
              lg: "215px" 
            }}
          >
            <Image
              src={
                ShowcaseData?.banner_3_image_link 
              }
              alt="Haircare"
              objectFit="cover"
              objectPosition={"left"}
              width="100%"
              height="100%"
              borderRadius="lg"
              boxShadow="md"
            />
          </Link>

          <Link
            href={ShowcaseData?.banner_4_image_redirect_link || "#"}
            height={{ 
              base: "150px", 
              sm: "200px", 
              md: "210px", 
              lg: "215px" 
            }}
          >
            <Image
              src={
                ShowcaseData?.banner_4_image_link
              }
              alt="Makeup Kits"
              objectFit="cover"
              objectPosition={"left"}
              width="100%"
              height="100%"
              borderRadius="lg"
              boxShadow="md"
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
