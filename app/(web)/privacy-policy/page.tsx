import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { PrivacyPolicyContainer } from "./(components)";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  openGraph: {
    title: "Privacy Policy",
  },
};
const PrivacyPolicy = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Privacy Policy"
        breadcrumb={BREADCRUMB_CONFIG.Privacy_Policy}
      />

      <PrivacyPolicyContainer />
    </>
  );
};

export default PrivacyPolicy;
