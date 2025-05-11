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
  const { data: ShowcaseData } = useConfigQuery();

  return (
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
                ShowcaseData?.banner_1_image_link ||
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
                <Link href={ShowcaseData.banner_4_image_redirect_link}>
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex alignItems="center" gap={2}>
                      <Text>Shop Brands</Text>
                      <FaArrowRightLong />
                    </Flex>
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      width="100%"
                      height="2px"
                      bg="pink.500"
                    />
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
                ShowcaseData?.banner_2_image_link ||
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
                <Link href={ShowcaseData.banner_3_image_redirect_link}>
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex alignItems="center" gap={2}>
                      <Text>Discover Now</Text>
                      <FaArrowRightLong />
                    </Flex>
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      width="100%"
                      height="2px"
                      bg="pink.500"
                    />
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
                ShowcaseData?.banner_3_image_link ||
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
                <Link href={ShowcaseData.banner_3_image_redirect_link}>
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex alignItems="center" gap={2}>
                      <Text>Discover Now</Text>
                      <FaArrowRightLong />
                    </Flex>
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      width="100%"
                      height="2px"
                      bg="pink.500"
                    />
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
                ShowcaseData?.banner_4_image_link ||
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
                <Link href={ShowcaseData.banner_4_image_redirect_link}>
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    p={0}
                    height="auto"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                    borderRadius="0"
                  >
                    <Flex alignItems="center" gap={2}>
                      <Text>Shop Now</Text>
                      <FaArrowRightLong />
                    </Flex>
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      width="100%"
                      height="2px"
                      bg="pink.500"
                    />
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
