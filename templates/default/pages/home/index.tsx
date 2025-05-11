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

export const DefaultLandingPage = ({ initialData }: HeroSectionProps) => {
 
  return (
    <>
      <HeroSection initialData={initialData} />
      <BrandCategory />
      <FeaturedCategory />
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
