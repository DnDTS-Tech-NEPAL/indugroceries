import { useForm } from "react-hook-form";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowLeftIcon } from "@/assets/svg";
import { Button, FormProvider, Header, PasswordInput } from "@/components";
import { useResetPasswordMutation } from "@/hooks/api";
import { setPasswordSchema } from "@/schema";
import { useOtpVerifiedEmailStore } from "@/store";
import { SetPasswordProps, SetPasswordType } from "@/types";

const defaultValues: SetPasswordType = {
  password: "",
  confirmPassword: "",
};

export const SetPassword = ({ setActiveStep }: SetPasswordProps) => {
  const methods = useForm<SetPasswordType>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  const { mutate: SetPassword, isPending } = useResetPasswordMutation();

  const { verifiedEmail } = useOtpVerifiedEmailStore();

  const onSubmit = (data: SetPasswordType) => {
    const payload = {
      email: verifiedEmail,
      npwd: data.confirmPassword,
    };

    SetPassword(payload, {
      onSuccess: () => {
        setActiveStep(4);
      },
    });
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
      <Flex
        as="button"
        onClick={() => setActiveStep(1)}
        align="center"
        bg={"grey.100"}
        w={"fit-content"}
        h={"40px"}
        p={"8px"}
        cursor={"pointer"}
        mb={"116px"}
      >
        <ArrowLeftIcon />
        <Text
          ml={2}
          color={"primary.400"}
          variant={"subtitle2"}
          fontWeight={400}
        >
          Back to otp screen
        </Text>
      </Flex>
      <Header
        title="Reset Password"
        description="Please the given credentials to begin transactions."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack alignItems="stretch" gap="16px" marginTop="20px">
          <PasswordInput name="password" label="Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />
          <Button marginTop="8px" type="submit" loading={isPending}>
            Submit
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
