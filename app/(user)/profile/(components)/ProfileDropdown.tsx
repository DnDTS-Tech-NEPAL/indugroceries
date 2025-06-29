"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import { Profile } from "@/assets/svg";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  RegisterDialog,
} from "@/components";
import { ROUTES } from "@/constants";
import { removeTokenFromClient } from "@/service";

export const ProfileDropdown = () => {
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

  return (
    <>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button p={0} bg="primary.50" color={"black"}>
            <Profile />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem
            value="profile"
            onClick={() => router.push(ROUTES.USER.PROFILE)}
            _hover={{ bg: "primary.100" }}
          >
            Profile
          </MenuItem>
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

      <RegisterDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        initialStep={activeStep}
      />
    </>
  );
};
