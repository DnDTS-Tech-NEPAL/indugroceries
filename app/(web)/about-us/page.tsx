import { Metadata } from "next";

import { getAboutUsData } from "@/api";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import {
  // OurMission,
  Revolutionizing,
  // TeamSection,
  // TestimonialCarousel,
  // WhyChooseUs,
} from "./(components)";

// import JoinUs from "@/components/ui/joinUs/JoinUs";
import Journey from "./(components)/Journey";
import MissionVisionValues from "./(components)/MissionVisionValues";
import { Stack } from "@chakra-ui/react";
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
      <Stack color={"gray.700"}>
        <Revolutionizing data={aboutUsData} />
        {/* <OurMission data={aboutUsData} /> */}
        <MissionVisionValues data={aboutUsData} />
        <Journey data={aboutUsData} />
      </Stack>

      {/* <TeamSection data={aboutUsData} /> */}
      {/* <WhyChooseUs data={aboutUsData} /> */}
      {/* <TestimonialCarousel data={aboutUsData} />
      <JoinUs data={aboutUsData} /> */}
    </>
  );
};

export default AboutUs;
