import { Tabs } from "@/components";
import { useProductDetailByNameQuery } from "@/hooks/api";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useVariantStore } from "@/store";
// import { ChevronDown, ChevronUp } from "lucide-react";
// // import { useState } from "react";

export const TabsDescription = ({ productName }: { productName: string }) => {
  const { data: productDetail } = useProductDetailByNameQuery(productName);
  const { activeVariant } = useVariantStore();
  // const [expanded, setExpanded] = useState(false);

  const selectedVariant = productDetail?.variants?.find(
    (v) => v.item_code === activeVariant
  );

  const displayProduct = productDetail?.has_variants
    ? selectedVariant || productDetail
    : productDetail;

  const getCleanText = (value: unknown): string | null => {
    if (typeof value === "string" && value.trim() && value.trim() !== "null") {
      return value.trim();
    }
    return null;
  };

  const shortDescription = getCleanText(
    displayProduct?.custom_short_description
  );
  const longDescription =
    getCleanText(displayProduct?.custom_long_description) ||
    getCleanText(productDetail?.custom_long_description);

  const hasAnyDescription = shortDescription || longDescription;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      mb={{ base: 1, md: 3 }}
      borderBottom={{ base: 0, md: "0.1rem solid #a1a1a157" }}
    >
      <Tabs
        tabs={[
          {
            value: "description",
            label: "Description",
            content: (
              <VStack align="start" width="100%">
                {/* Fallback message */}
                {!hasAnyDescription ? (
                  <Text fontSize="sm" color="primary.400">
                    No product description available.
                  </Text>
                ) : (
                  <>
                    {/* Short Description */}
                    {shortDescription && (
                      <Box
                        w="full"
                        fontSize="sm"
                        color="primary.400"
                        dangerouslySetInnerHTML={{ __html: shortDescription }}
                      />
                    )}

                    {/* Long Description (collapsible) */}
                    {longDescription && (
                      <Box
                        as="details"
                        width="100%"
                        // onToggle={(e) =>
                        //   setExpanded(
                        //     (e.currentTarget as HTMLDetailsElement).open
                        //   )
                        // }
                      >
                        <Box
                          as="summary"
                          cursor="pointer"
                          color="primary.700"
                          display="flex"
                          alignItems="center"
                          gap={2}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {/* {expanded
                            ? "Hide Description"
                            : "View More Description"}
                          <Icon as={expanded ? ChevronUp : ChevronDown} /> */}
                        </Box>
                        <Box
                          mt={2}
                          fontSize="sm"
                          color="primary.400"
                          dangerouslySetInnerHTML={{ __html: longDescription }}
                        />
                      </Box>
                    )}
                  </>
                )}
              </VStack>
            ),
          },
        ]}
        size="sm"
      />
    </Box>
  );
};
