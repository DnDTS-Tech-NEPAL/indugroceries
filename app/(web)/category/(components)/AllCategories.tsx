"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Container, Grid, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { InputGroup } from "@/components/form/input/InputGroup";
import { SearchIcon } from "@/assets/svg";
import { ROUTES } from "@/constants";
import { generateNextPath, toTitleCase } from "@/utils";
import { useFeaturedCategoryImages } from "@/hooks/app";
export default function AllCategories() {
  const router = useRouter();
  const featureImages = useFeaturedCategoryImages();

  const [search, setSearch] = useState("");

  return (
    <Container
      maxW="6xl"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Filters */}
      <VStack align="stretch" gap={4} mb={8}>
        <InputGroup
          startElement={
            <SearchIcon
              style={{ paddingRight: "10px", height: "30px", width: "30px" }}
            />
          }
        >
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </VStack>

      {/* Category Grid */}
      {featureImages.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
        >
          {featureImages.map((item, index) => (
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
              onClick={() => {
                router.push(
                  generateNextPath(ROUTES.APP.INDIVIDUAL_CATEGORY, {
                    categoryName: item.name,
                  })
                );
              }}
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
                  src={item.image}
                  alt={item.name}
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
                {toTitleCase(item.name)}
              </Text>
            </Box>
          ))}
        </Grid>
      ) : (
        <Text fontSize="lg" color="gray.500" textAlign="center" mt={12}>
          No categories found.
        </Text>
      )}
    </Container>
  );
}
