import Image from "next/image";
import { useForm } from "react-hook-form";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { EmailVerificationImage } from "@/assets/image";
import { ArrowLeftIcon, EyeIcon } from "@/assets/svg";
import { Button, FormProvider, Header, PinInput } from "@/components";
import { useCheckOtpMutation } from "@/hooks/api";
import { emailVerificationSchema } from "@/schema";
import { useOtpEmailStore, useOtpVerifiedEmailStore } from "@/store";
import {
  CheckOtpType,
  EmailVerificationProps,
  EmailVerificationType,
} from "@/types";

const defaultValues: EmailVerificationType = {
  email: "",
  otp: "",
};

export const OtpVerification = ({ setActiveStep }: EmailVerificationProps) => {
  const methods = useForm<EmailVerificationType>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues,
  });

  const { otpEmail } = useOtpEmailStore();

  const { setVerifiedEmail } = useOtpVerifiedEmailStore();

  const { mutate: checkOtp, isPending } = useCheckOtpMutation();

  const onSubmit = (data: CheckOtpType) => {
    const payload = {
      email: otpEmail,
      otp: data.otp,
    };

    checkOtp(payload, {
      onSuccess: (response) => {
        if (response.data.otp_verification === 1) {
          setVerifiedEmail(otpEmail);
          setActiveStep(3);
        }
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

      <Image
        src={EmailVerificationImage}
        alt="Email Verification"
        width={120}
        height={120}
      />

      <Header
        title="Email Verification"
        description="An OTP has been sent to your email address. If you don't see it in your inbox, try checking your spam folder as well."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack alignItems="stretch" gap="16px" marginTop="20px">
          <Flex justifyContent={"space-between"}>
            <Flex gap={1}>
              <Text>sent to</Text>
              <Text color={"primary.400"} fontWeight={590}>
                {otpEmail}
              </Text>
            </Flex>
            <Flex cursor={"pointer"}>
              <EyeIcon />
              <Text color={"primary.700"} fontWeight={510}>
                Show
              </Text>
            </Flex>
          </Flex>
          <PinInput name="otp" />

          <Button marginTop="8px" type="submit" loading={isPending}>
            Submit
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
