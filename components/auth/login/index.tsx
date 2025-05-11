"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Checkbox,
  Dialog,
  FormProvider,
  Header,
  OtpDialog,
  PasswordInput,
  TextFieldInput,
} from "@/components";
import { useLoginMutation, useConfigQuery } from "@/hooks/api";
import { LoginFormType, loginSchema } from "@/schema";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { LoginDialogProps } from "@/types";

import { AuthWrapper } from "../wrapper";
import { CloseCircleIcon } from "@/assets/svg";

const defaultValues = {
  email: "",
  password: "",
};

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { mutate: handleLogin, isPending } = useLoginMutation();

  const onSubmit = (data: LoginFormType) => {
    handleLogin(data, {
      onSuccess: () => {
        methods.reset();
        onClose();
      },
      onError: () => {},
    });
  };

  const { updateSignInOpen } = useLayoutDialogStore();
  const { updateSignUpOpen } = useRegisterDialogStore();

  const handleSignin = () => {
    updateSignUpOpen(true);
    updateSignInOpen(false);
  };
  const handleClose = () => {
    updateSignInOpen(false);
  };

  const [isOtpOpen, setOtpOpen] = useState(false);

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
        contentMinWidth={{
          lg: "1000px",
          xl: "1200px",
        }}
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
        <AuthWrapper imageSrc={LoginImage}>
          <VStack
            position="relative"
            alignItems="stretch"
            justifyContent="center"
            gap="20px"
            height="full"
            px={{
              base: "32px",
              xl: "80px",
            }}
          >
            <Header
              title="Login Screen"
              description="Please provide the given credentials to login."
            />

            <FormProvider methods={methods} onSubmit={onSubmit}>
              <VStack alignItems="stretch" gap="16px" marginTop="20px">
                <TextFieldInput
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                />
                <PasswordInput name="password" label="Password" />

                <HStack justifyContent="space-between">
                  <Checkbox>Remember me</Checkbox>

                  <IconButton
                    variant={"plain"}
                    color="system.text.light.light"
                    as={"button"}
                    type="button"
                    _hover={{ cursor: "pointer" }}
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </IconButton>
                </HStack>

                <Button type="submit" marginTop="8px" loading={isPending}>
                  Submit
                </Button>
              </VStack>
            </FormProvider>

            <Text
              variant="subtitle2"
              bottom="32px"
              left="0"
              width="full"
              color="system.text.light.light"
              textAlign="center"
            >
              Don’t have an account?{" "}
              <Text
                as="span"
                variant="paragraphSmall"
                color="system.neutral.info.light"
                cursor="pointer"
                onClick={handleSignin}
              >
                Sign up
              </Text>
            </Text>
          </VStack>
        </AuthWrapper>
      </Dialog>

      <OtpDialog open={isOtpOpen} onClose={() => setOtpOpen(false)} />
    </>
  );
};
