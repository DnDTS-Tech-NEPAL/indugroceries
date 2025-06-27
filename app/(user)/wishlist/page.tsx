"use client";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

// import { useUserProfileQuery } from "@/hooks/api";
import MyWishlist from "./(components)/MyWishlist";
import { ProductsYouMayLike } from "@/app/(web)/products/[productName]/(components)";
import { BenefitsSection } from "@/templates/default/pages/home/(components)";

const Wishlist = () => {
  // const { data: profileData } = useUserProfileQuery();

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Wishlist"
        breadcrumb={BREADCRUMB_CONFIG.WISHLIST}
      />

      <MyWishlist />
      <ProductsYouMayLike />
      <BenefitsSection />
    </>
  );
};

export default Wishlist;
