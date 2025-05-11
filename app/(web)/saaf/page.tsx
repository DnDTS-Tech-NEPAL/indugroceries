import HeroSection from "./(component)/HeroSection";
import ContentSection from "./(component)/ContentSection";
import ProductShowcase from "./(component)/ProductShowcase";
import SaafDifference from "./(component)/SaafDifference";
import Discover from "./(component)/Discover";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Saaf",
  openGraph: {
    title: "Saaf",
  },
};
const Saaf = () => {
  return (
    <>
      <HeroSection />
      <ContentSection />
      <ProductShowcase />
      <SaafDifference />
      <Discover />
    </>
  );
};

export default Saaf;
