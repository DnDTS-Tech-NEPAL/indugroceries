"use client";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";


import { useUserProfileQuery } from "@/hooks/api";
import AccountDashboard from "./MyAccount";

const UserAccount = () => {
  const { data: profileData } = useUserProfileQuery();

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Profile"
        breadcrumb={BREADCRUMB_CONFIG.PROFILE}
      />

     <AccountDashboard/>

      {/* <CartWishlistSection /> */}
    </>
  );
};

export default UserAccount;
