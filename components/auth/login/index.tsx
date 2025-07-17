"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Checkbox,
  Dialog,
  FormProvider,
  OtpDialog,
  PasswordInput,
  TextFieldInput,
} from "@/components";
import { useLoginMutation, useConfigQuery } from "@/hooks/api";
import { LoginFormType, loginSchema } from "@/schema";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { LoginDialogProps } from "@/types";

import { CloseCircleIcon, Mail, Password } from "@/assets/svg";
import Image from "next/image";

import { AuthWrapper } from "../wrapper";
import { updateWishlistCart } from "@/api";
import { getOrCreateGuestId } from "@/utils/guest";
import { useQueryClient } from "@tanstack/react-query";

const defaultValues = {
  email: "",
  password: "",
};

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { mutate: handleLogin, isPending } = useLoginMutation();
  const { updateSignInOpen } = useLayoutDialogStore();
  const { updateSignUpOpen } = useRegisterDialogStore();
  const guid = getOrCreateGuestId();
  const [isOtpOpen, setOtpOpen] = useState(false);

  const onSubmit = (data: LoginFormType) => {
    handleLogin(data, {
      onSuccess: () => {
        methods.reset();
        updateWishlistCart(guid);
        queryClient.invalidateQueries({ queryKey: ["wishlist-count", guid] });
        queryClient.invalidateQueries({ queryKey: ["wishlist", guid] });
        queryClient.invalidateQueries({ queryKey: ["cart-count", guid] });
        queryClient.invalidateQueries({ queryKey: ["cart", guid] });
        onClose();
      },
    });
  };

  const handleSignin = () => {
    updateSignUpOpen(true);
    updateSignInOpen(false);
  };

  const handleClose = () => {
    updateSignInOpen(false);
  };

  const handleForgotPassword = () => {
    onClose();
    setOtpOpen(true);
  };

  const { data: imageData } = useConfigQuery();
  const LoginLogo = imageData?.company_details_url;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        contentMinWidth={{ base: "90%", lg: "450px" }}
      >
        <Box
          position="absolute"
          top="16px"
          right="16px"
          zIndex={3}
          cursor="pointer"
          onClick={handleClose}
        >
          <CloseCircleIcon color="red" />
        </Box>

        <AuthWrapper>
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={10}
            px={{ base: 6, md: 12 }}
            minH="500px"
            w="full"
          >
            <VStack w="full" align="stretch" maxW="400px">
              {/* Logo */}
              {LoginLogo && (
                <Flex justify="center" align="center" mb={4}>
                  <Image src={LoginLogo} alt="Logo" width={80} height={80} />
                </Flex>
              )}

              <FormProvider methods={methods} onSubmit={onSubmit}>
                <VStack align="stretch">
                  <TextFieldInput
                    startElement={<Mail />}
                    name="email"
                    label="Email Address"
                    placeholder="Enter your Email Address"
                  />
                  <PasswordInput
                    startElement={<Password />}
                    name="password"
                    label="Password"
                    placeholder="Enter your Password"
                  />

                  <HStack justifyContent="space-between" alignItems="center">
                    <Checkbox>Remember me</Checkbox>

                    <Text
                      fontSize="sm"
                      color="gray.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Text>
                  </HStack>

                  <Button
                    bg="primary.400"
                    color="white"
                    type="submit"
                    loading={isPending}
                  >
                    Log In
                  </Button>

                  <Text fontSize="md" textAlign="center">
                    Don&apos;t have an account?
                    <Text
                      as="span"
                      color="primary.500"
                      fontWeight="medium"
                      cursor="pointer"
                      onClick={handleSignin}
                      _hover={{ textDecoration: "underline" }}
                    >
                      &nbsp; Sign up &nbsp;
                    </Text>
                  </Text>
                </VStack>
              </FormProvider>
            </VStack>
          </Flex>
        </AuthWrapper>
      </Dialog>

      <OtpDialog open={isOtpOpen} onClose={() => setOtpOpen(false)} />
    </>
  );
};
