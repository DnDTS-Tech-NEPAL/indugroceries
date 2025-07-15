import { HeroSectionProps } from "@/types";

import {
  BestSellers,
  BrandCategory,
  FeaturedCategory,
  HeroSection,
  NewArrivals,
  SummerSale,
  BenefitsSection,
} from "./(components)";
import ProductShowcase from "./(components)/ProductShowcase";
import { ShopSkinCareMakeup } from "./(components)/Shop";

export const DefaultLandingPage = ({ initialData }: HeroSectionProps) => {
  return (
    <>
      <HeroSection initialData={initialData} />
      <FeaturedCategory />
      <ProductShowcase />
      <BrandCategory />
      <BestSellers />

      <SummerSale />
      <NewArrivals />
      <ShopSkinCareMakeup />

      <BenefitsSection />
    </>
  );
};
