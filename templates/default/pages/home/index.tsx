import { HeroSectionProps } from "@/types";

import {
  Banners,
  BestSellers,
  BrandCategory,
  FeaturedCategory,
  HeroSection,
  NewArrivals,
  Offer,
  SaafSection,
  SummerSale,
  PartnerWithUs,
  HomepageContact,
} from "./(components)";
import GlobalReach from "./(components)/GlobalReach";
import FAQ from "@/app/(web)/faq/page";
import ProductShowcase from "./(components)/ProductShowcase";



export const DefaultLandingPage = ({ initialData }: HeroSectionProps) => {
 
  return (
    <>
      <HeroSection initialData={initialData} />
      <FeaturedCategory />
      <ProductShowcase/>
      <BrandCategory />
      <Offer />
      <NewArrivals />
      <SummerSale />
      <PartnerWithUs />
      <SaafSection />
      <BestSellers />   
      <Banners />
      <FAQ/>
      <GlobalReach />
      <HomepageContact />
    </>
  );
};
