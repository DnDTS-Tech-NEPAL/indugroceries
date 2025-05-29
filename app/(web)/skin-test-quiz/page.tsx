import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { Metadata } from "next";

import { BenefitsSection } from "@/templates/default/pages/home/(components)";
import LandingPage from "./(components)/LandingPage";

export const metadata: Metadata = {
  title: "Skin Test Quiz",
  openGraph: {
    title: "Skin Test Quiz",
  },
};
const SkinTestQuiz = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Skin Test Quiz"
        breadcrumb={BREADCRUMB_CONFIG.SKIN_TEST_QUIZ}
      />

      <LandingPage />
      <BenefitsSection />
    </>
  );
};

export default SkinTestQuiz;
