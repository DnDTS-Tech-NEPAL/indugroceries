import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { CartWishlistSection, ProfileDetails } from "./(components)";

const UserProfile = async () => (
  <>
    <PageTitle
      backLabel="Back to homepage"
      backLink={ROUTES.APP.HOMEPAGE}
      title="Profile"
      breadcrumb={BREADCRUMB_CONFIG.PROFILE}
    />

    <ProfileDetails />

    <CartWishlistSection />
  </>
);

export default UserProfile;
