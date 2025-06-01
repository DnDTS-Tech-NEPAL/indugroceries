"use client";

import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfigQuery } from "@/hooks/api";

export const InStoreVisit = () => {
  const router = useRouter();
const { data: storeData } = useConfigQuery();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      bg="pink.50"
      px={{ base: 4, md: 16 }}
      py={{ base: 8, md: 16 }}
      align="center"
      justify="center"
      gap={8}
    >
      <Box flexShrink={0}>
        <Image
          src={storeData.banner_1_image_url}
          alt="K-Beauty Store"
          width={640}
          height={400}
          style={{ borderRadius: "1rem" }}
        />
      </Box>

      <VStack align="start" spaceY={8} maxW="lg">
        <Heading fontSize={{ base: "2xl", md: "4xl" }} color="#FF6996">
         {storeData.banner_1_title}
        </Heading>
        <Text fontSize={{ base: "md", md: "3xl" }} lineHeight={1.2}>
          {storeData.banner_1_description}
        </Text>
        <Button
          colorScheme="pink"
         bg={"#FF6996"}
          borderRadius="full"
          onClick={() => router.push(storeData.banner_1_image_url)}
        >
          Locate our Stores <ArrowRight size={20} />
        </Button>
      </VStack>
    </Flex>
  );
};
