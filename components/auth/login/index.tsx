"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
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

import { Apple, CloseCircleIcon, Google, Mail, Password } from "@/assets/svg";
import { LoginLogo } from "@/assets/image";
import Image from "next/image";
import Link from "next/link";
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
  const LoginImage = imageData?.login_screen_photo_link;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        contentMinWidth={{ lg: "1000px", xl: "1200px" }}
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
          <Flex direction={{ base: "column", lg: "row" }} height="full">
            {/* Left - Image */}

            <Box
              w={{ base: "100%", lg: "50%" }}
              h="auto"
              p={0}
              m={0}
              display="flex"
              alignItems="stretch"
            >
              {LoginImage && (
                <Image
                  src={LoginImage}
                  alt="Login Visual"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>

            {/* Right - Login Form */}
            <Box
              w={{ base: "100%", lg: "50%" }}
              py={10}
              px={{ base: 6, md: 12, xl: 20 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <VStack w="full" align="stretch" gap={6}>
                {/* Logo and Title */}
                <Flex justifyContent={"center"} align="center" gap={8} mb={6}>
                  <Image src={LoginLogo} alt="Logo" width={200} height={200} />
                  {/* <Text fontSize="2xl" fontWeight="medium">
                    Welcome Back To Korean Beauty Point
                  </Text> */}
                </Flex>

                <FormProvider methods={methods} onSubmit={onSubmit}>
                  <VStack gap={8} align="stretch">
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

                    <HStack justifyContent="space-between">
                      <Checkbox>Remember me</Checkbox>

                      <IconButton
                        variant={"plain"}
                        color="#7A7A7A"
                        as={"button"}
                        type="button"
                        _hover={{ cursor: "pointer" }}
                        onClick={handleForgotPassword}
                      >
                        Forgot password?
                      </IconButton>
                    </HStack>

                    <Button
                      bg="#FF6996"
                      color="white"
                      type="submit"
                      loading={isPending}
                    >
                      Log In
                    </Button>

                    <Text fontSize="md" color="gray.500">
                      By continuing with Google account, Apple or Email you
                      agree to KBP
                      <Link href={""}>
                        {" "}
                        <Text as="span" color="pink.500" fontWeight="medium">
                          &nbsp; Term services &nbsp;
                        </Text>{" "}
                      </Link>
                      and
                      <Link href={""}>
                        {" "}
                        <Text as="span" color="pink.500" fontWeight="medium">
                          &nbsp; Privacy Policy &nbsp;
                        </Text>
                      </Link>
                    </Text>

                    <HStack w="full" align="center" gap={4}>
                      <Box flex="1" h="1px" bg="gray.300" />
                      <Text fontSize="md" color="gray.500" whiteSpace="nowrap">
                        or continue with
                      </Text>
                      <Box flex="1" h="1px" bg="gray.300" />
                    </HStack>

                    {/* Social Login Buttons */}
                    <HStack gap={16} justify="center">
                      <Button
                        bg={"#D0D0D0"}
                        borderRadius={"md"}
                        variant="plain"
                        flex={1}
                      >
                        <Google
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "8px",
                          }}
                        />
                        Google
                      </Button>

                      <Button
                        bg={"#D0D0D0"}
                        borderRadius={"md"}
                        variant="plain"
                        flex={1}
                      >
                        <Apple
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "8px",
                          }}
                        />
                        Apple
                      </Button>
                    </HStack>

                    <Text fontSize="md" textAlign="center">
                      Don&apos;t have an account?
                      <Text
                        as="span"
                        color="pink.500"
                        fontWeight="medium"
                        cursor="pointer"
                        onClick={handleSignin}
                        _hover={{ textDecoration: "underline" }}
                      >
                        &nbsp; Sign up &nbsp;
                      </Text>
                      create account?
                    </Text>
                  </VStack>
                </FormProvider>
              </VStack>
            </Box>
          </Flex>
        </AuthWrapper>
      </Dialog>

      <OtpDialog open={isOtpOpen} onClose={() => setOtpOpen(false)} />
    </>
  );
};
