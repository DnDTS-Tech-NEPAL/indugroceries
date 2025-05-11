import { Metadata } from "next";

import { getAboutUsData } from "@/api";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import {
  // OurMission,
  Revolutionizing,
  TeamSection,
  TestimonialCarousel,
  // WhyChooseUs,
} from "./(components)";
import TimelineSection from "./(components)/Timeline";
import JoinUs from "@/components/ui/joinUs/JoinUs";
import Journey from "./(components)/Journey";
import MissionVisionValues from "./(components)/MissionVisionValues";
// import Journey from "./(components)/Journey";

export const metadata: Metadata = {
  title: "About Us",
  openGraph: {
    title: "About Us",
  },
};

const AboutUs = async () => {
  const data = await getAboutUsData();

  const aboutUsData = data?.Data;

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="About Us"
        breadcrumb={BREADCRUMB_CONFIG.ABOUT_US}
      />
      <Revolutionizing data={aboutUsData} />
      {/* <OurMission data={aboutUsData} /> */}
      <MissionVisionValues data={aboutUsData} />
      <Journey data={aboutUsData} />
      <TimelineSection data={aboutUsData} />
      <TeamSection data={aboutUsData} />
      {/* <WhyChooseUs data={aboutUsData} /> */}
      <TestimonialCarousel data={aboutUsData} />
      <JoinUs data={aboutUsData} />
    </>
  );
};

export default AboutUs;
