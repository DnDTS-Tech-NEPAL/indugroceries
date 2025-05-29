"use client";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Text,
  Heading,
  Container,
  VStack,
  SimpleGrid,
  Flex,
  RadioGroup,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { FormControl } from "@/components";
import { InfluencerHeroImage } from "@/assets/image";
import Image from "next/image";
import { useState } from "react";

export default function Apply() {
  const methods = useForm();
  const { register, handleSubmit } = methods;

  const onSubmit = () => {};
  const [value, setValue] = useState<string | null>(null);
  const items = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  return (
    <Box
      maxW={"7xl"}
      py={6}
      margin={"auto"}
      minH="100vh"
      px={{ base: 4, md: 6 }}
    >
      {/* Hero Section */}
      <Box
        position="relative"
        h={{ base: "300px", md: "400px" }}
        w="full"
        overflow="hidden"
        borderRadius="xl"
      >
        <Image
          src={InfluencerHeroImage}
          alt="Call for Influencer - Beauty products with dried flowers"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box position="absolute" inset={0} bg="blackAlpha.600" />
        <Flex
          position="absolute"
          inset={0}
          direction="column"
          align="center"
          justify="center"
          color="white"
          textAlign="center"
          px={4}
        >
          <Heading as="h1" size={{ base: "xl", md: "3xl" }} mb={4}>
            Call for Influencer
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} maxW="2xl">
            Share your love for K-beauty, receive exclusive products, and grow
            with a vibrant skincare community.
          </Text>
        </Flex>
      </Box>

      {/* Application Form */}
      <Container maxW="7xl" py={8}>
        <FormProvider {...methods}>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <FormControl
                name="fullName"
                label="Your full name"
                inputType="input"
              />
              <FormControl
                name="email"
                label="Email Address"
                inputType="input"
              />
              <FormControl
                name="phoneNumber"
                label="Phone Number"
                inputType="input"
              />
              <FormControl
                name="fullAddress"
                label="Full Address"
                inputType="input"
              />
            </SimpleGrid>

            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={"space-between"}
              alignItems={{ base: "flex-start", md: "center" }}
              gap={6}
              mt={6}
              w={"full"}
            >
              <FormControl
                name="instagramUrl"
                label="Instagram Url"
                inputType="input"
              />
              <FormControl
                name="tiktokUrl"
                label="Tiktok Url"
                inputType="input"
              />
              <FormControl
                name="uploadLink"
                label="Upload link"
                inputType="input"
              />
            </Flex>

            {/* Radio Questions */}
            <VStack gap={6} mt={8} align="stretch">
              <Box>
                <Text fontWeight="medium" mb={1}>
                  Have you previously worked with KBP before?*
                </Text>
                <Text fontSize="sm" mb={2}>
                  Either through our affiliates program/ previous KBP Influencer
                  Program launches/ if one of our KBP team members have reached
                  out to you for collaborations before
                </Text>
                <RadioGroup.Root defaultValue="">
                  <RadioGroup.Root
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                  >
                    <HStack gap="6" flexWrap="wrap">
                      {items.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            {item.label}
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </HStack>
                  </RadioGroup.Root>
                </RadioGroup.Root>
              </Box>

              <Box>
                <Text fontWeight="medium" mb={2}>
                  Have you collaborated with any beauty or health related
                  brand?*
                </Text>
                <RadioGroup.Root defaultValue="">
                  <RadioGroup.Root
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                  >
                    <HStack gap="6" flexWrap="wrap">
                      {items.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            {item.label}
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </HStack>
                  </RadioGroup.Root>
                </RadioGroup.Root>
              </Box>
            </VStack>

            <Box mt={6}>
              <Text fontWeight="medium" mb={2}>
                If answered &quot;Yes in previous question, kindly explain the
                collaboration method below and share the most engaged post link.
              </Text>
              <Textarea
                {...register("collaborationDetails")}
                placeholder="Explain your previous collaboration..."
                rows={6}
              />
            </Box>

            <Box textAlign={{ base: "center", md: "left" }} mt={8}>
              <Button
                type="submit"
                bg={"#FF6996"}
                color="white"
                px={10}
                py={6}
                rounded="full"
                fontSize="lg"
                _hover={{ bg: "pink.600" }}
                w={{ base: "full", md: "auto" }}
              >
                Submit Form
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Container>
    </Box>
  );
}
