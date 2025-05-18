// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Box, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react";
// import { ROUTES } from "@/constants";
// import { useBrandsListQuery } from "@/hooks/api";

// export default function AllBrands() {
//   const router = useRouter();
//   const { data: brandData } = useBrandsListQuery();

//   return (
//     <Container
//       maxW="6xl"
//       px={{ base: 4, md: 6 }}
//       py={{ base: 8, md: 12, lg: 16 }}
//     >
//       {/* Header Section */}
//       <VStack gap={6} mb={{ base: 8, md: 12 }} align="center">
//         <Heading
//           fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
//           textAlign="center"
//         >
//           Our Brands
//         </Heading>

//         <Text
//           fontSize={{ base: "md", md: "lg" }}
//           color="system.text.normal.light"
//           textAlign="center"
//           maxW="3xl"
//         >
//           Discover our brands.
//         </Text>
//       </VStack>

//       {/* Brands Grid */}
//       <Grid
//         templateColumns={{
//           base: "repeat(2, 1fr)",
//           sm: "repeat(3, 1fr)",
//           md: "repeat(4, 1fr)",
//           lg: "repeat(5, 1fr)",
//         }}
//         gap={{ base: 4, md: 6 }}
//       >
//         {brandData?.map((brand, index) => (
//           <Box
//             key={index}
//             bg="white"
//             borderRadius="lg"
//             boxShadow="sm"
//             overflow="hidden"
//             transition="all 0.3s ease"
//             _hover={{
//               boxShadow: "lg",
//               transform: "translateY(-4px)",
//             }}
//             cursor="pointer"
//             onClick={() =>
//               router.push(`${ROUTES.APP.BRANDS}?brands=${brand.name}`)
//             }
//             p={4}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//           >
//             <Box
//               position="relative"
//               width="100%"
//               height={{ base: "120px", md: "160px" }}
//               mb={3}
//             >
//               <Image
//                 src={brand.custom_brand_logo_link}
//                 alt={brand.name}
//                 fill
//                 style={{
//                   objectFit: "contain",
//                   objectPosition: "center",
//                   padding: "8px",
//                 }}
//                 sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
//               />
//             </Box>

//             <Text
//               fontWeight="medium"
//               textAlign="center"
//               mt="auto"
//               fontSize={{ base: "sm", md: "md" }}
//             >
//               {brand.name}
//             </Text>
//           </Box>
//         ))}
//       </Grid>
//     </Container>
//   );
// }
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ROUTES } from "@/constants";
import { useBrandsListQuery } from "@/hooks/api";
import { useState, useMemo } from "react";

export default function AllBrands() {
  const router = useRouter();
  const { data: brandData } = useBrandsListQuery();
  const [search, setSearch] = useState("");

  // Filter brands based on search input
  const filteredBrands = useMemo(() => {
    if (!search.trim()) return brandData;
    return brandData?.filter((brand) =>
      brand.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, brandData]);

  return (
    <Container
      maxW="6xl"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Header Section */}
      <VStack gap={6} mb={{ base: 8, md: 12 }} align="center">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          textAlign="center"
        >
          Our Brands
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="system.text.normal.light"
          textAlign="center"
          maxW="3xl"
        >
          Discover our brands.
        </Text>

        {/* Search Input */}
        <Input
          placeholder="Search brands..."
          maxW="md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outline"
        />
      </VStack>

      {/* Brands Grid */}
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={{ base: 4, md: 6 }}
      >
        {filteredBrands?.map((brand, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "lg",
              transform: "translateY(-4px)",
            }}
            cursor="pointer"
            onClick={() =>
              router.push(`${ROUTES.APP.PRODUCTS}?brands=${brand.name}`)
            }
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              position="relative"
              width="100%"
              height={{ base: "120px", md: "160px" }}
              mb={3}
            >
              <Image
                src={brand.custom_brand_logo_link}
                alt={brand.name}
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  padding: "8px",
                }}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </Box>

            <Text
              fontWeight="medium"
              textAlign="center"
              mt="auto"
              fontSize={{ base: "sm", md: "md" }}
            >
              {brand.name}
            </Text>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
