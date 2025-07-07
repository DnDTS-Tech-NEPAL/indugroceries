"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSkinTypePageQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { Collapsible } from "@chakra-ui/react";

interface SkinTypeDescriptionProps {
  skinTypeName: string;
}

export const SkinTypeDescription = ({ skinTypeName }: SkinTypeDescriptionProps) => {
  const { data: skinTypeData = [], isLoading } = useSkinTypePageQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  const skinType = skinTypeData.find(
    (s) => s.name.toLowerCase() === skinTypeName.toLowerCase()
  );

  if (isLoading) {
    return (
      <Text textAlign={"center"} fontWeight={"bold"}>
        <Spinner />
      </Text>
    );
  }
  if (!skinType) {
    return (
      <Text textAlign={"center"} fontWeight={"bold"}>
        No brand found with the name &quot;{skinTypeName}&quot;
      </Text>
    );
  }

  return (
    <>
      {skinType.short_description && (
        <Box
          width={{ base: "100%", md: "7xl" }}
          maxWidth="100%"
          mx="auto"
          px={{ base: "0", md: "4" }}
          py={{ base: "4", md: "8", lg: "12" }}
        >
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            About {skinType.name}
          </Text>
          <Box>
            {skinType.short_description && (
              <Text fontSize="md" mt={8}>
                {skinType.short_description}
              </Text>
            )}

            {skinType.long_description && (
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
                      __html: skinType.long_description,
                    }}
                  />
                </Collapsible.Content>
              </Collapsible.Root>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
