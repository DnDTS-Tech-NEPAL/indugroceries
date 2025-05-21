"use client";

import { useForm } from "react-hook-form";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { ArrowLeftIcon, CloseCircleIcon } from "@/assets/svg";
import { Button, FormProvider, Header, PasswordInput } from "@/components";
import { useSetPasswordMutation } from "@/hooks/api";
import { setPasswordSchema } from "@/schema";
import { removeTokenFromClient } from "@/service";
import { useRegisterDialogStore } from "@/store";
import { SetPasswordProps, SetPasswordType } from "@/types";

const defaultValues: SetPasswordType = {
  password: "",
  confirmPassword: "",
};

export const SetPassword = ({ setActiveStep }: SetPasswordProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<SetPasswordType>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  const { mutate: SetPassword, isPending } = useSetPasswordMutation();
  const { updateSignUpOpen } = useRegisterDialogStore();

  const onSubmit = (data: SetPasswordType) => {
    SetPassword(data, {
      onSuccess: () => {
        removeTokenFromClient();
        updateSignUpOpen(false);
        setActiveStep(4);
        queryClient.resetQueries({ queryKey: ["user-profile"] });
      },
      onError: () => {},
    });
  };

  const handleClose = () => {
    updateSignUpOpen(false);
  };

  return (
    <VStack
      alignItems="stretch"
      justifyContent="center"
      gap="20px"
      height="full"
      px="80px"
      mt={"60px"}
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
      <Flex
        as="button"
        onClick={() => setActiveStep(1)}
        align="center"
        // bg={"grey.100"}
        w={"142px"}
        h={"40px"}
        p={"8px"}
        cursor={"pointer"}
        mb={"1rem"}
      >
        <ArrowLeftIcon />
        <Text
          ml={2}
          color={"primary.400"}
          variant={"subtitle2"}
          fontWeight={400}
        >
          Back to register
        </Text>
      </Flex>
      <Header
        title="Set Password"
        description="Please the given credentials to begin transactions."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack alignItems="stretch" gap="16px" marginTop="20px">
          <PasswordInput name="password" label="Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />
          <Button
            bg={"#FF6996"}
            marginTop="8px"
            type="submit"
            loading={isPending}
          >
            Submit
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
