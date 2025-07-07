"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSkinTypePageQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
interface SkinTypeDescriptionProps {
  skinTypeName: string;
}

export const SkinTypeDescription = ({
  skinTypeName,
}: SkinTypeDescriptionProps) => {
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
            <Text fontSize="md" mt={8} textAlign={"justify"}>
              {skinType.short_description}{" "}
              {skinType.long_description && !isExpanded && (
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

            {isExpanded && skinType.long_description && (
              <Box mt={4}>
                <Box
                  fontSize={"md"}
                  dangerouslySetInnerHTML={{
                    __html: skinType.long_description,
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
