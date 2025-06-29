"use client";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import AccountDashboard from "./MyAccount";

const UserAccount = () => {
  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Profile"
        breadcrumb={BREADCRUMB_CONFIG.PROFILE}
      />

      <AccountDashboard />

      {/* <CartWishlistSection /> */}
    </>
  );
};

export default UserAccount;
