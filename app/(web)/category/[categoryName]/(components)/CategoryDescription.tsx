"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useCategoriesListQuery } from "@/hooks/api";
import Link from "next/link";
import { useState } from "react";

interface CategoryDescriptionProps {
  categoryName: string;
}

export const CategoryDescription = ({
  categoryName,
}: CategoryDescriptionProps) => {
  const { data: categoryData = [], isLoading } = useCategoriesListQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const category = categoryData.find(
    (b) => b.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (isLoading) {
    return (
      <Text textAlign={"center"} fontWeight={"bold"}>
        <Spinner />
      </Text>
    );
  }

  if (!category) {
    return (
      <Text textAlign={"center"} fontWeight={"bold"}>
        No category found with the name &quot;{categoryName}&quot;
      </Text>
    );
  }

  return (
    <>
      {category.description && (
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
            <Text fontSize="md" mt={8} textAlign={"justify"}>
              {category.description}{" "}
              {category.custom_category_description && !isExpanded && (
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

            {isExpanded && category.custom_category_description && (
              <Box mt={4}>
                <Box
                  fontSize={"md"}
                  dangerouslySetInnerHTML={{
                    __html: category.custom_category_description,
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
                    marginTop: "10px",
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
