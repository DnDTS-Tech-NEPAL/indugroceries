"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Container, Grid, Input, Text, VStack } from "@chakra-ui/react";
import { ROUTES } from "@/constants";
import { useBrandsListQuery } from "@/hooks/api";
import { useState, useMemo } from "react";
import AlphabetFilter from "./AlphabetFilter";
import { InputGroup } from "@/components/form/input/InputGroup";
import { SearchIcon } from "@/assets/svg";
import { generateNextPath } from "@/utils";

export default function AllBrands() {
  const router = useRouter();
  const { data: brandData = [] } = useBrandsListQuery();
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("A");

  const filteredBrands = useMemo(() => {
    return brandData.filter((brand) => {
      const name = brand.name.toLowerCase();
      const matchesSearch = name.includes(search.toLowerCase());
      const matchesLetter = brand.name[0]?.toUpperCase() === activeLetter;
      return matchesSearch && matchesLetter;
    });
  }, [search, activeLetter, brandData]);

  return (
    <Container
      maxW="6xl"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Alphabet Filter & Search */}
      <VStack align="stretch" gap={4} mb={8}>
        <AlphabetFilter
          activeLetter={activeLetter}
          onSelect={setActiveLetter}
        />
        <InputGroup
          startElement={
            <SearchIcon
              style={{ paddingRight: "10px", height: "30px", width: "30px" }}
            />
          }
        >
          <Input
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </VStack>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={{ base: 4, md: 6 }}
        >
          {filteredBrands.map((brand, index) => (
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
                  generateNextPath(ROUTES.APP.INDIVIDUAL_BRAND, {
                    brandName: brand.name,
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
      ) : (
        <Text fontSize="lg" color="gray.500" textAlign="center" mt={12}>
          No brands found.
        </Text>
      )}
    </Container>
  );
}
