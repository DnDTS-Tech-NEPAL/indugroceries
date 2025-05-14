"use client";

import { VisibleSection } from "@/components/ui/visibleSection";
import { ProductSection } from "./ProductSection";
import { useConfigQuery } from "@/hooks/api";


export const BestSellers = () => {
  const { data: config } = useConfigQuery();
  return (
    <VisibleSection visibility={config?.best_seller_visibility}>
  <ProductSection type="bestSellers" showCategories={true} />
  </VisibleSection>);
};

export const NewArrivals = () => {
  const { data: config } = useConfigQuery();
  return (
    <VisibleSection visibility={config?.new_arrival_visibility}>
      <ProductSection type="newArrivals" showCategories={false} />
    </VisibleSection>
  )
};
