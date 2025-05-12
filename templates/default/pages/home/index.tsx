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
} from "./(components)";
import ProductShowcase from "./(components)/ProductShowcase";
export const DefaultLandingPage = ({ initialData }: HeroSectionProps) => {
 
  return (
    <>
      <HeroSection initialData={initialData} />
      <FeaturedCategory />
      <ProductShowcase/>
      <BrandCategory />
      <BestSellers />   
      <SummerSale />
      <NewArrivals />
      <SocialFeed/>
      <BenefitsSection/>
    </>
  );
};
