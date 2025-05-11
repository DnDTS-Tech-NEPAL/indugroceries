import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { ReturnPolicyContainer } from "./(components)";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Return Policy",
  openGraph: {
    title: "Return Policy",
  },
};
const ReturnPolicy = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Return Policy"
        breadcrumb={BREADCRUMB_CONFIG.RETURN_Policy}
      />
      <ReturnPolicyContainer />
    </>
  );
};

export default ReturnPolicy;
