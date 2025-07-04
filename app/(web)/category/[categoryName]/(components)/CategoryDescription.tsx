"use client";
import { Box, Text } from "@chakra-ui/react";
import {useCategoriesListQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { Collapsible } from "@chakra-ui/react";

interface CategoryDescriptionProps {
  categoryName: string;
}

export const CategoryDescription = ({ categoryName }: CategoryDescriptionProps) => {
  const { data: categoryData = [] } = useCategoriesListQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const category = categoryData.find(
    (b) => b.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) {
    return <Text>No category found with the name &quot;{categoryName}&quot;</Text>;
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
        About {category.name}
      </Text>
      <Box>
        {category.description && (
          <Text fontSize="md" mt={12}>
            {category.description}
          </Text>
        )}

        {category.custom_category_description && (
          <Collapsible.Root open={isExpanded}>
            <Collapsible.Trigger asChild>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
                style={{
                  color: "blue",
                  marginTop: "10px",
                  textDecoration: "underline",
                }}
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
                  __html: category.custom_category_description,
                }}
              />
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </Box>
    </Box>
  );
};
