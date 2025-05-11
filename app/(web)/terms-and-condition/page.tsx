import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { TermsAndConditionContainer } from "./(components)";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions",
  openGraph: {
    title: "Terms & Conditions",
  },
};
const ReturnPolicy = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Terms and Conditions"
        breadcrumb={BREADCRUMB_CONFIG.TERMS_AND_CONDITION}
      />
      <TermsAndConditionContainer />
    </>
  );
};

export default ReturnPolicy;
