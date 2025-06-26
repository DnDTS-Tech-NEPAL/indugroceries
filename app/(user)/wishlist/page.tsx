"use client";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";


import { useUserProfileQuery } from "@/hooks/api";
import MyWishlist from "./(components)/MyWishlist";


const Wishlist = () => {
  const { data: profileData } = useUserProfileQuery();

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Wishlist"
        breadcrumb={BREADCRUMB_CONFIG.WISHLIST}
      />

     <MyWishlist/>  

  
    </>
  );
};

export default Wishlist;
