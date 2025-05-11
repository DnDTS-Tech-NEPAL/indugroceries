"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import { MoreIcon } from "@/assets/svg";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  RegisterDialog,
} from "@/components";
import { ROUTES } from "@/constants";
import { useUserProfileQuery } from "@/hooks/api";
import { removeTokenFromClient } from "@/service";

export const ProfileDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(3);

  const handleLogout = () => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    removeTokenFromClient();
    queryClient.resetQueries({ queryKey: ["user-profile"] });
    router.push(ROUTES.APP.HOMEPAGE);
    //Clear cart and wishlist count
    queryClient.resetQueries({ queryKey: ["cart-count"] });
    queryClient.resetQueries({ queryKey: ["wishlist-count"] });
    queryClient.resetQueries({ queryKey: ["payment-method"] });
  };

  const handleOpenDialog = () => {
    setActiveStep(3);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const { data: profileData } = useUserProfileQuery();

  return (
    <>
      <Flex
        direction="row"
        align="center"
        justifyContent="space-between"
        mt={6}
        maxWidth="1280px"
        mx="auto"
        px={{ base: "20px", xl: "0" }}
      >
        <Box>
          <Heading variant="heading5">{profileData?.customer_name}</Heading>
        </Box>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant="outline"
              borderRadius="8px"
              border="1px solid"
              borderColor="primary.200"
              bg="primary.50"
            >
              <MoreIcon />
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem
              value="logout"
              onClick={handleLogout}
              _hover={{ bg: "primary.100" }}
            >
              Logout
            </MenuItem>
            <MenuItem
              value="reset"
              onClick={() => handleOpenDialog()}
              _hover={{ bg: "primary.100" }}
            >
              Reset Password
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>

      <RegisterDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        initialStep={activeStep}
      />
    </>
  );
};
