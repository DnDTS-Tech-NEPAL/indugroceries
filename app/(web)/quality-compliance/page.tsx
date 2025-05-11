import { Metadata } from "next";
import ArrangementSection from "./(component)/ArrangementSection";
import AwarenessSection from "./(component)/AwarenessSection";
import Discover from "./(component)/Discover";
import HeroSection from "./(component)/HeroSection";
import SmartErpSection from "./(component)/SmartErpSection";
export const metadata: Metadata = {
  title: "Quality & Compliance",
  openGraph: {
    title: "Quality & Compliance",
  },
};
const QualityCompliance = () => {
  return (
    <>
      <HeroSection />
      <ArrangementSection />
      <AwarenessSection />
      <SmartErpSection />
      <Discover />
    </>
  );
};

export default QualityCompliance;
