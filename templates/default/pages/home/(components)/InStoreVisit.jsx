"use client";

import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const InStoreVisit = () => {
  const router = useRouter();

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
          src="/images/in-store.png"
          alt="K-Beauty Store"
          width={640}
          height={400}
          style={{ borderRadius: "1rem" }}
        />
      </Box>

      <VStack align="start" spacing={4} maxW="lg">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} color="pink.500">
          Visit us in-store too!
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Come and meet us in person at one of our K-Beauty Stores!
        </Text>
        <Button
          colorScheme="pink"
          rightIcon={<ArrowRight size={20} />}
          borderRadius="full"
          onClick={() => router.push("/stores")}
        >
          Locate our Stores
        </Button>
      </VStack>
    </Flex>
  );
};