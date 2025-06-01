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
      width="100%"
      maxW="container.xl"
      mx="auto"
      overflow="hidden"
      boxShadow="md"
    >
      {/* Image Section (50%)  */}
      <Box 
        flex={{ base: "none", md: "1.5" }}
        width={{ base: "100%", md: "60%" }}
        position="relative"
        minH={{ base: "300px", md: "60vh" }}
      >
        <Image
          src={storeData.banner_1_image_url}
          alt="K-Beauty Store"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content Section (50%) */}
      <Box
        flex={{ base: "none", md: "1" }}
        width={{ base: "100%", md: "40%" }}
        bg="pink.50"
        p={{ base: 8, md: 16 }}
      >
        <VStack 
          align="start" 
          gapY={8} 
          height="100%"
          justify="center"
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} color="#FF6996">
            {storeData.banner_1_title}
          </Heading>
          <Text fontSize={{ base: "md", md: "3xl" }} lineHeight={1.6}>
            {storeData.banner_1_description}
          </Text>
          <Button
            colorScheme="pink"
            bg="#FF6996"
            borderRadius="full"
            onClick={() => router.push(storeData.banner_1_image_url)}
            _hover={{ bg: "#e55c84" }}
            
          >
            Locate our Stores <ArrowRight size={20} />
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};