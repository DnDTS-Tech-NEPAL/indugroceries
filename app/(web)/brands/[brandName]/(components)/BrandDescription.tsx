"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useBrandsListQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";

interface BrandDescriptionProps {
  brandName: string;
}

export const BrandDescription = ({ brandName }: BrandDescriptionProps) => {
  const { data: brandData = [], isLoading } = useBrandsListQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const brand = brandData.find(
    (b) => b.name.toLowerCase() === brandName.toLowerCase()
  );

  if (isLoading) {
    return (
      <Text textAlign={"center"} fontWeight={"bold"}>
        <Spinner />
      </Text>
    );
  }

  if (!brand) {
    return (
      <Text textAlign={"center"} fontWeight={"bold"}>
        No brand found with the name &quot;{brandName}&quot;
      </Text>
    );
  }

  return (
    <>
      {brand.description && (
        <Box
          width={{ base: "100%", md: "7xl" }}
          maxWidth="100%"
          mx="auto"
          px={{ base: "0", md: "4" }}
          py={{ base: "4", md: "8", lg: "12" }}
        >
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            About {brand.name}
          </Text>

          <Box>
            <Text fontSize="md" mt={8}>
              {brand.description}{" "}
              {brand.custom_brand_description && !isExpanded && (
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(true);
                  }}
                  style={{
                    color: "blue",
                    marginLeft: "8px",
                    textDecoration: "underline",
                  }}
                >
                  Show more
                </Link>
              )}
            </Text>

            {isExpanded && brand.custom_brand_description && (
              <Box mt={4}>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: brand.custom_brand_description,
                  }}
                />
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(false);
                  }}
                  style={{
                    color: "blue",
                    display: "inline-block",
                    textDecoration: "underline",
                  }}
                >
                  Show less
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
