import { Flex, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { EmailVerificationImage } from "@/assets/image";
import { ArrowLeftIcon, EyeIcon } from "@/assets/svg";
import { Button, FormProvider, Header, PinInput } from "@/components";
import { useEmailVerifyMutation, useResendOtpMutation } from "@/hooks/api";
import { emailVerificationSchema } from "@/schema";
import { useVerifyEmailStore } from "@/store";
import { EmailVerificationProps, EmailVerificationType } from "@/types";

const defaultValues: EmailVerificationType = {
  email: "",
  otp: "",
};

export const EmailVerification = ({
  setActiveStep,
}: EmailVerificationProps) => {
  const methods = useForm<EmailVerificationType>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues,
  });

  const { mutate: VerifyEmail, isPending } = useEmailVerifyMutation();
  const { mutate: resendOtp } = useResendOtpMutation();
  const { verifyEmail } = useVerifyEmailStore();

  const onSubmit = (data: EmailVerificationType) => {
    const emailPayload = {
      email: verifyEmail,
      otp: data.otp,
    };

    VerifyEmail(emailPayload, {
      onSuccess: () => {
        setActiveStep(3);
      },
    });
  };

  const handleResentOtp = () => {
    const resendEmailPayload = {
      email: verifyEmail,
    };
    resendOtp(resendEmailPayload);
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
        w={"142px"}
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
          Back to register
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
                {verifyEmail}
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

          <Flex gap={1}>
            <Text color={"primary.300"}>Haven&apos;t Received it Yet? </Text>
            <Text
              onClick={() => {
                handleResentOtp();
              }}
              fontWeight={590}
              color={"primary.400"}
              cursor={"pointer"}
            >
              Resend it
            </Text>
          </Flex>
          <Button marginTop="8px" type="submit" loading={isPending}>
            Submit
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
