"use client";
import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { CartWishlistSection } from "./(components)";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Profile } from "@/assets/svg";
import { useUserProfileQuery } from "@/hooks/api";

const UserProfile = () => {
  const { data: profileData } = useUserProfileQuery();

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Profile"
        breadcrumb={BREADCRUMB_CONFIG.PROFILE}
      />

      {/* <ProfileDetails /> */}
      <Box mt={6} maxWidth="7xl" mx="auto" px={{ base: "20px", md: "6" }}>
        <Flex align="center" gap={4}>
          {/* Icon on the left */}
          <Box boxSize="50px">
            <Profile width="100%" height="100%" />
          </Box>

          {/* Name and user info stacked vertically */}
          <Flex direction="column">
            <Heading variant="heading5">{profileData?.customer_name}</Heading>
            {profileData?.user && (
              <>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {profileData.user}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {profileData.custom_customer_contact}
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Box>

      <CartWishlistSection />
    </>
  );
};

export default UserProfile;
