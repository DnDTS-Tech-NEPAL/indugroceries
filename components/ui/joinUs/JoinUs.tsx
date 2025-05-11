"use client";
import { ROUTES } from "@/constants";
import { useRegisterDialogStore } from "@/store";
import { JoinUsProps } from "@/types";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const JoinUs = ({ data }: JoinUsProps) => {
  const { updateSignUpOpen } = useRegisterDialogStore();
  const router = useRouter();

  return (
    <Box
      maxW={"8xl"}
      mx={"auto"}
      px={{ base: 4, md: 8, lg: 8 }}
      py={{ base: 6, md: 16, xl: 16 }}
      bgImage={`url(${data?.footer_image_link})`}
      bgPos="bottom"
      bgRepeat="no-repeat"
      bgSize="cover"
      position="relative"
    >
      {/* Dark overlay */}
      {/* <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(252, 236, 236, 0.53)" 
        zIndex={1} 
      /> */}

      {/* Content */}
      <Stack
        maxW={"7xl"}
        px={{ base: 4, md: 6, lg: 8 }}
        pt={{ base: 6, md: 10, xl: 20 }}
        pb={{ base: 6, md: 10, xl: 20 }}
        flex="1"
        gap={4}
        position="relative"
        zIndex={2}
      >
        <Heading
          fontSize={{ base: "36px", md: "36px", lg: "48px" }}
          fontWeight="semibold"
          color="white"
        >
          {data?.footer_title}
        </Heading>
        <Text
          fontSize={{ base: "16px", md: "18px" }}
          color="white"
          width={"90%"}
        >
          {data?.footer_description}
        </Text>
        <Flex gap={4}>
          <Button
            color="white"
            bg="#16CA5E"
            borderRadius={"md"}
            alignSelf={{ base: "stretch", sm: "start" }}
            onClick={() => updateSignUpOpen(true)}
            _hover={{ bg: "#14b955" }}
            zIndex={2} // Ensure buttons are above overlay
          >
            Partner With Us
          </Button>
          <Button
            color="white"
            borderColor="white"
            variant={"outline"}
            borderRadius={"md"}
            py={{ base: 2, md: 2 }}
            alignSelf={{ base: "stretch", sm: "start" }}
            onClick={() => router.push(ROUTES.APP.CONTACT_US)}
            _hover={{ bg: "whiteAlpha.200" }}
            zIndex={2} // Ensure buttons are above overlay
          >
            Contact
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default JoinUs;
