"use client";
import { useConfigQuery } from "@/hooks/api";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ShopSkinCareMakeup = () => {
  const { data: shopData } = useConfigQuery();
  const router = useRouter();

  if (!shopData || !shopData.banners || shopData.banners.length < 2) {
    return null;
  }

  return (
    <Flex
      gap={{ base: 4, sm: 6, md: 8 }}
      justifyContent="center"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      px={{ base: 4, sm: 6, md: 8, lg: 0 }}
      py={{ base: 8, sm: 10, md: 12, lg: 16 }}
      maxW="6xl"
      mx="auto"
    >
      {shopData.banners.slice(0, 2).map((banner, index) => (
        <Box
          key={index}
          w="100%"
          maxW={{ base: "100%", sm: "100%", md: "48%", lg: "50%" }}
          h={{ base: "300px", sm: "350px", md: "350px" }}
          position="relative"
          aspectRatio={{ base: "1/1", sm: "16/9" }}
        >
          <Image
            src={banner.image_url}
            alt={banner.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 616px"
            priority={index === 0}
            style={{ objectFit: "cover", borderRadius: "1rem" }}
          />
          <Text
            position="absolute"
            top={{ base: "35%", sm: "40%" }}
            left="50%"
            transform="translate(-50%, -50%)"
            fontSize={{ base: "24px", sm: "28px", md: "32px" }}
            fontWeight="bold"
            color="white"
            textAlign="center"
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
            px={2}
            width="100%"
          >
            {banner.title}
          </Text>
          <Button
            position="absolute"
            top={{ base: "50%", sm: "55%" }}
            left="50%"
            transform="translate(-50%, -50%)"
            colorScheme="pink"
            bgColor="#FF6996"
            borderRadius="md"
            size={{ base: "sm", md: "md" }}
            px={{ base: 4, md: 6 }}
            py={{ base: 2, md: 4 }}
            _hover={{ transform: "translate(-50%, -50%)" }}
            onClick={() => router.push(banner.redirect_url || "#")}
          >
            <Text fontSize={{ base: "14px", sm: "16px", md: "18px" }}>
              Show Me More
            </Text>
          </Button>
        </Box>
      ))}
    </Flex>
  );
};
