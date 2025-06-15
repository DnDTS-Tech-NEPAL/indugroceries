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

"use client";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ProductShowcase() {
  const { data: showcaseData } = useConfigQuery();

  return (
    <>
    <Box
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 10 }}
      maxW="container.xl"
      mx="auto"
    >
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        {/* Left Section: Two Large Horizontal Cards */}
        <Flex direction={{ base: "column", md: "row" }} flex="2" gap={6}>
          {/* Lipsticks & Glosses */}
          <Box
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            position="relative"
            flex="1"
            height={{ base: "400px", md: "450px" }}
          >
            <Image
              src={
                showcaseData?.banner_1_image_link ||
                "/placeholder.svg?height=600&width=800"
              }
              alt="Lipsticks"
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
                  Clearance
                </Text>
                <Heading size="lg" fontWeight="bold" lineHeight="1.2" mt={1}>
                  Lipsticks & Glosses
                </Heading>
                <Text color="gray.600" fontSize="lg" mt={2}>
                  from $9.99
                </Text>
              </Box>

              <Box>
                <Link
                  href={showcaseData.banner_4_image_redirect_link}
                  _hover={{ textDecoration: "none" }}
                >
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    bg={"transparent"}
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex
                      alignItems="center"
                      gap={2}
                      borderBottom={"2px solid #FF6996"}
                    >
                      <Text color={"pink.500"}>Shop Brands</Text>
                      <FaArrowRightLong color="#FF6996" />
                    </Flex>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Skincare Product */}
          <Box
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            position="relative"
            flex="1"
            height={{ base: "400px", md: "450px" }}
          >
            <Image
              src={
                showcaseData?.banner_2_image_link ||
                "/placeholder.svg?height=600&width=800"
              }
              alt="Skincare"
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
                  On Sale
                </Text>
                <Heading size="lg" fontWeight="bold" lineHeight="1.2" mt={1}>
                  Skincare Product
                </Heading>
                <Text color="gray.600" fontSize="lg" mt={2}>
                  from $12.00
                </Text>
              </Box>

              <Box>
                <Link
                  href={showcaseData.banner_3_image_redirect_link}
                  _hover={{ textDecoration: "none" }}
                >
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    bg={"transparent"}
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex
                      alignItems="center"
                      gap={2}
                      borderBottom={"2px solid #FF6996"}
                    >
                      <Text color={"pink.500"}>Discover Now</Text>
                      <FaArrowRightLong color="#FF6996" />
                    </Flex>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>

        {/* Right Section: Two Vertical Cards */}
        <Flex direction="column" flex="1" gap={6}>
          {/* Haircare Favorites */}
          <Box
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            position="relative"
            height={{ base: "250px", md: "215px" }}
            bgGradient="linear(to-r, blue.50, cyan.50)"
          >
            <Image
              src={
                showcaseData?.banner_3_image_link ||
                "/placeholder.svg?height=300&width=600"
              }
              alt="Haircare"
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
                  Clearance
                </Text>
                <Heading size="lg" fontWeight="bold" lineHeight="1.2">
                  Haircare Favorites
                </Heading>
                <HStack gap={1} alignItems="baseline" mt={1}>
                  <Text color="gray.700" fontSize="md">
                    up to
                  </Text>
                  <Text color="pink.500" fontSize="3xl" fontWeight="bold">
                    40%
                  </Text>
                  <Text color="gray.700" fontSize="md">
                    off
                  </Text>
                </HStack>
              </Box>

              <Box>
                <Link
                  href={showcaseData.banner_3_image_redirect_link}
                  _hover={{ textDecoration: "none" }}
                >
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    bg={"transparent"}
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex
                      alignItems="center"
                      gap={2}
                      borderBottom={"2px solid #FF6996"}
                    >
                      <Text color={"pink.500"}>Discover Now</Text>
                      <FaArrowRightLong color="#FF6996" />
                    </Flex>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Makeup Kits & Combos */}
          <Box
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            position="relative"
            height={{ base: "250px", md: "215px" }}
          >
            <Image
              src={
                showcaseData?.banner_4_image_link ||
                "/placeholder.svg?height=300&width=600"
              }
              alt="Makeup Kits"
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
                  New Arrivals
                </Text>
                <Heading size="lg" fontWeight="bold" lineHeight="1.2">
                  Makeup Kits & Combos
                </Heading>
                <Text color="gray.600" fontSize="lg" mt={1}>
                  from $29.00
                </Text>
              </Box>

              <Box>
                <Link
                  href={showcaseData.banner_4_image_redirect_link}
                  _hover={{ textDecoration: "none" }}
                >
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    bg={"transparent"}
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    // _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                    borderBottom="1px solid pink.500"
                  >
                    <Flex
                      alignItems="center"
                      gap={2}
                      borderBottom={"2px solid #FF6996"}
                    >
                      <Text color={"pink.500"}>Shop Now</Text>
                      <FaArrowRightLong color="#FF6996" />
                    </Flex>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
    </>
  );
}
