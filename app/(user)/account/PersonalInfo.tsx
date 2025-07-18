import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserProfileQuery } from "@/hooks/api";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Input,
  Button,
  Flex,
  Separator,
  Text,
  // HStack,
  // Icon,
} from "@chakra-ui/react";
import { FormProvider } from "@/components";
import { setPasswordSchema } from "@/schema";
import { SetPasswordType } from "@/types";
import { useResetPasswordMutation } from "@/hooks/api";
// import { RiVerifiedBadgeFill } from "react-icons/ri";

const defaultValues: SetPasswordType = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function PersonalInfo() {
  const { data: profileData } = useUserProfileQuery();
  const methods = useForm<SetPasswordType>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  const { mutate: setPassword, isPending } = useResetPasswordMutation();

  const onSubmit = (data: SetPasswordType) => {
    if (!profileData?.user) return;

    const payload = {
      email: profileData.user,
      npwd: data.confirmPassword,
    };

    setPassword(payload, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  return (
    <Box rounded="lg" border="1px">
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Text fontSize="2xl" fontWeight="medium">
          Personal
        </Text>

        {/* <HStack gap={1}>
          <Icon color="primary.500" boxSize={7}>
            <RiVerifiedBadgeFill />
          </Icon>
          <Text fontWeight="medium" color="gray.700">
            Loyalty Points:
          </Text>
          <Text fontWeight="bold" color="primary.500">
            {profileData?.data[0]?.total_points}
          </Text>
        </HStack> */}
      </Flex>
      <VStack gap={8} align="stretch">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="First name"
                color={"black"}
                value={profileData?.data[0]?.customer_name}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                placeholder="Email"
                color={"black"}
                value={profileData?.data[0]?.user}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                color={"black"}
                placeholder="Phone"
                value={profileData?.data[0]?.custom_customer_contact}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                color={"black"}
                placeholder="Date of Birth"
                value={profileData?.data[0]?.custom_date_of_birth}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Separator />
        <Box>
          <Text fontSize={"2xl"} fontWeight={"medium"} mb={8}>
            Change Password
          </Text>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <VStack gap={6} align="stretch">
              <FormControl>
                <FormLabel>New password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  color={"black"}
                  {...methods.register("password")}
                />
                {methods.formState.errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {methods.formState.errors.password.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  color={"black"}
                  type="password"
                  placeholder="Confirm password"
                  {...methods.register("confirmPassword")}
                />
                {methods.formState.errors.confirmPassword && (
                  <Text color="red.500" fontSize="sm">
                    {methods.formState.errors.confirmPassword.message}
                  </Text>
                )}
              </FormControl>
              <Flex justify="flex-end">
                <Button
                  bgColor={"primary"}
                  colorScheme="primary"
                  px={4}
                  borderRadius={"md"}
                  type="submit"
                  loading={isPending}
                >
                  Save Changes
                </Button>
              </Flex>
            </VStack>
          </FormProvider>
        </Box>
      </VStack>
    </Box>
  );
}
