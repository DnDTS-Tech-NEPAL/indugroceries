"use client";

import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { useReturnPolicy } from "@/hooks/api";

export const ReturnPolicyContainer = () => {
  const { data: ReturnData } = useReturnPolicy();
  return (
    <Box
      px={{
        base: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
      }}
    >
      <Box
        gap={{ md: "20px", lg: "40px", xl: "60px" }}
        mx="auto"
        maxWidth="1280px"
        px={{
          base: "20px",
          lg: "0",
        }}
        py={{ base: "24px", lg: "32px", "2xl": "56px" }}
      >
        <Stack gap={8} alignItems={"stretch"}>
          <VStack alignItems="start" gap={2}>
            <Heading variant={"heading4"} fontWeight={400}>
              {ReturnData?.data.data.page_title}
            </Heading>
            <Text
              variant={"paragraphSmall"}
              fontWeight={400}
              color={"primary.300"}
            >
              {ReturnData?.data.data.page_subtitle}
            </Text>
          </VStack>
          <VStack alignItems="start">
            {ReturnData?.data?.data?.page_content?.map((policy, index) => {
              return (
                <VStack key={index} gap={2} alignItems={"start"}>
                  <Text variant={"paragraphLarge"} color={"primary.400"}>
                    {policy.title}
                  </Text>
                  <Text variant={"paragraphSmall"} color={"primary.300"}>
                    {policy.subtitle}
                  </Text>
                  <Box
                    height={"fit-content"}
                    w={{
                      base: "350px",
                      md: "700px",
                      lg: "950px",
                      xl: "1280px",
                    }}
                    p={5}
                    bg={"gray.100"}
                    border={"1px solid"}
                    borderColor={"primary.100"}
                    mb={8}
                  >
                    <Text
                      fontWeight={400}
                      variant={"paragraphSmall"}
                      color={"primary.400"}
                      dangerouslySetInnerHTML={{ __html: policy.content }}
                    ></Text>
                  </Box>
                </VStack>
              );
            })}
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};
