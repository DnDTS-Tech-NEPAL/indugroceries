"use client";

import { VisibleSection } from "@/components/ui/visibleSection";
import { ProductSection } from "./ProductSection";
import { useConfigQuery } from "@/hooks/api";
import { Box } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";

export const BestSellers = () => {
  const { data: config } = useConfigQuery();
  return (
    <VisibleSection visibility={config?.best_seller_visibility}>
      <Box>
        <ProductSection type="bestSellers" showCategories={true} />
      </Box>
    </VisibleSection>
  );
};

export const NewArrivals = () => {
  const { data: config } = useConfigQuery();
  return (
    <VisibleSection visibility={config?.new_arrival_visibility}>
      <Box background="system.neutral.background.white">
        <ProductSection type="newArrivals" showCategories={false} />
      </Box>
    </VisibleSection>
  );
};
