import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { Metadata } from "next";
import InfluencerPage from "./(components)/InfluencerPage";
import { BenefitsSection } from "@/templates/default/pages/home/(components)";

export const metadata: Metadata = {
  title: "Call For Influencer",
  openGraph: {
    title: "Call For Influencer",
  },
};
const CallInfluencer = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Call for Influencer"
        breadcrumb={BREADCRUMB_CONFIG.CALL_FOR_INFLUENCER}
      />
      <InfluencerPage />
      <BenefitsSection />
    </>
  );
};

export default CallInfluencer;
