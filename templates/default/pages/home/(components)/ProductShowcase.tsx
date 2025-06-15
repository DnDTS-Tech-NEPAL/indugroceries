// "use client";
// import { Box, Flex, Image, Link } from "@chakra-ui/react";
// import { useConfigQuery } from "@/hooks/api";

// export default function ProductShowcase() {
//   const { data: ShowcaseData } = useConfigQuery();

//   return (
// <Box py={{ base: 6, md: 8, lg: 10 }} px={{ base: 4, sm: 6, md: 8 }} maxW="7xl" mx="auto">
//   <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 4, md: 6 }}>
//     {/* Left Section: Two Large Horizontal Images */}
//     <Flex
//       direction={{ base: "column", md: "row" }}
//       flex={{ base: "1", lg: "2" }}
//       gap={{ base: 4, md: 6 }}
//     >
//       <Link
//         href={ShowcaseData?.banner_4_image_redirect_link || "#"}
//         flex="1"
//         height={{
//           base: "200px",
//           sm: "250px",
//           md: "350px",
//           lg: "450px"
//         }}
//       >
//         <Image
//           src={
//             ShowcaseData?.banner_1_image_link
//           }
//           alt="Lipsticks"
//           objectFit="cover"
//           objectPosition={"left"}
//           width="100%"
//           height="100%"
//           borderRadius="lg"
//           boxShadow="md"
//         />
//       </Link>

//       <Link
//         href={ShowcaseData?.banner_3_image_redirect_link || "#"}
//         flex="1"
//         height={{
//           base: "200px",
//           sm: "250px",
//           md: "350px",
//           lg: "450px"
//         }}
//       >
//         <Image
//           src={
//             ShowcaseData?.banner_2_image_link
//           }
//           alt="Skincare"
//           objectFit="fill"
//           objectPosition={"left"}
//           width="100%"
//           height="100%"
//           borderRadius="lg"
//           boxShadow="md"
//         />
//       </Link>
//     </Flex>

//     {/* Right Section: Two Vertical Images */}
//     <Flex
//       direction="column"
//       flex={{ base: "1", lg: "1" }}
//       gap={{ base: 4, md: 6 }}
//       mt={{ base: 4, lg: 0 }}
//     >
//       <Link
//         href={ShowcaseData?.banner_3_image_redirect_link || "#"}
//         height={{
//           base: "150px",
//           sm: "200px",
//           md: "210px",
//           lg: "215px"
//         }}
//       >
//         <Image
//           src={
//             ShowcaseData?.banner_3_image_link
//           }
//           alt="Haircare"
//           objectFit="cover"
//           objectPosition={"left"}
//           width="100%"
//           height="100%"
//           borderRadius="lg"
//           boxShadow="md"
//         />
//       </Link>

//       <Link
//         href={ShowcaseData?.banner_4_image_redirect_link || "#"}
//         height={{
//           base: "150px",
//           sm: "200px",
//           md: "210px",
//           lg: "215px"
//         }}
//       >
//         <Image
//           src={
//             ShowcaseData?.banner_4_image_link
//           }
//           alt="Makeup Kits"
//           objectFit="cover"
//           objectPosition={"left"}
//           width="100%"
//           height="100%"
//           borderRadius="lg"
//           boxShadow="md"
//         />
//       </Link>
//     </Flex>
//   </Flex>
// </Box>
//   );
// }
// ===================================================================================================

"use client";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";
import { FaArrowRightLong } from "react-icons/fa6";
import { FourBannerType } from "@/types";

interface BannerCardProps {
  banner: FourBannerType;
  variant: "large" | "small";
}

const BannerCard = ({ banner, variant }: BannerCardProps) => {
  const isWithText = banner.card_type === "With Text";

  const commonProps = {
    borderRadius: "lg",
    overflow: "hidden",
    boxShadow: "md",
    position: "relative",
    bg: "white",
  };

  const heightProps =
    variant === "large"
      ? { height: { base: "400px", md: "450px" } }
      : { height: { base: "300px", md: "215px" } };

  if (!isWithText) {
    // Card without text (just image + redirect)
    return (
      <Link href={banner.redirect_link}>
        <Box width={"100%"} {...commonProps} {...heightProps} cursor="pointer">
          <Image
            src={banner.image_link}
            alt={banner.card_subtitle}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
      </Link>
    );
  }

  return (
    <Box {...commonProps} {...heightProps}>
      <Image
        src={banner.image_link}
        alt={banner.card_subtitle}
        objectFit="cover"
        width="100%"
        height="100%"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        p={6}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Text fontWeight="bold" color="pink.500" fontSize="sm">
            {banner.card_title}
          </Text>
          <Heading size="lg" fontWeight="bold" lineHeight="1.2" mt={1}>
            {banner.card_subtitle}
          </Heading>
          <Text color="gray.600" fontSize="lg" mt={2}>
            {banner.card_description}
          </Text>
        </Box>

        <Box>
          <Link href={banner.redirect_link} _hover={{ textDecoration: "none" }}>
            <Button
              variant="ghost"
              colorScheme="pink"
              bg="transparent"
              p={0}
              height="auto"
              fontWeight="medium"
              fontSize="md"
              borderRadius="0"
            >
              <Flex
                alignItems="center"
                gap={2}
                borderBottom="2px solid #FF6996"
              >
                <Text color="pink.500">{banner.button_label}</Text>
                <FaArrowRightLong color="#FF6996" />
              </Flex>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default function ProductShowcase() {
  const { data: showcaseData } = useConfigQuery();

  const banners: FourBannerType[] = showcaseData?.four_banner_table ?? [];

  return (
    <Box
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 10 }}
      maxW="container.xl"
      mx="auto"
    >
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        {/* Left Side: Two large cards */}
        <Flex direction={{ base: "column", md: "row" }} flex="2" gap={6}>
          {banners.slice(0, 2).map((banner, idx) => (
            <BannerCard key={idx} banner={banner} variant="large" />
          ))}
        </Flex>

        {/* Right Side: Two smaller cards */}
        <Flex direction="column" flex="1" gap={6}>
          {banners.slice(2, 4).map((banner, idx) => (
            <BannerCard key={idx + 2} banner={banner} variant="small" />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
