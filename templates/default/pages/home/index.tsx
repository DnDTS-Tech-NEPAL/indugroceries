import { HeroSectionProps } from "@/types";

import {
  Banners,
  BestSellers,
  BrandCategory,
  FeaturedCategory,
  HeroSection,
  NewArrivals,
  SummerSale,
  SocialFeed,
  BenefitsSection,
  ShopBySkinType,
  InStoreVisit,
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
      <ShopBySkinType />
      <SummerSale />
      <NewArrivals />
      <ShopSkinCareMakeup />
      <InStoreVisit />
      <SocialFeed />
      <BenefitsSection />
    </>
  );
};
