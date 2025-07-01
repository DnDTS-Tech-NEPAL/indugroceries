"use client";
import { Box, Text } from "@chakra-ui/react";
import { useBrandsListQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { Collapsible } from "@chakra-ui/react";

interface BrandDescriptionProps {
  brandName: string; 
}

export const BrandDescription = ({ brandName }: BrandDescriptionProps) => {
  const { data: brandData = [] } = useBrandsListQuery();
  const [isExpanded, setIsExpanded] = useState(false);


  const brand = brandData.find(
    (b) => b.name.toLowerCase() === brandName.toLowerCase()
  );

  if (!brand) {
    return <Text>No brand found with the name "{brandName}"</Text>;
  }

  return (
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
        {brand.description && (
          <Text fontSize="md"   mt={12}>
            {brand.description}
          </Text>
        )}

        {brand.custom_brand_description && (
          <Collapsible.Root open={isExpanded}>
            <Collapsible.Trigger asChild>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
                style={{ color: "blue", marginTop: "10px", textDecoration: "underline" }}
              >
                Show more
              </Link>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Box
                mt={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                dangerouslySetInnerHTML={{
                  __html: brand.custom_brand_description,
                }}
              />
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </Box>
    </Box>
  );
};
