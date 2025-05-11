import Link from "next/link";
import { chakra, Flex, HStack, Text } from "@chakra-ui/react";

import { useConfigQuery, useUserProfileQuery } from "@/hooks/api";
export const Topbar = () => {
  const { data: topnavconfig } = useConfigQuery();
  const CustomSelect = chakra("select");
  return (
    <>
      <HStack
        alignItems="center"
        height="48px"
        background="system.neutral.background.dark"
        px={{
          base: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        }}
        // Only display topbar in laptop and larger resolution devices
        display={{
          base: "none",
          lg: "flex",
        }}
      >
        <Flex justifyContent="space-between" w={"full"}  mx="auto" maxW="6xl">
          <Text color="gray.700" display={"flex"} gap={8}>
            <Text>
              {topnavconfig.top_nav_bar_label}
              </Text>
            <Text borderLeft="2px solid black" pl="4" >
             {topnavconfig.top_navbar_content}*
              <Link
                href={topnavconfig.top_nav_bar_redirect_link}
                style={{ textDecoration: "underline", marginLeft: 6 }}
              >
                Shop Now
              </Link>
            </Text>
          </Text>
          <CustomSelect bg="system.neutral.background.dark">
            <option style={{backgroundColor:"white",color:"black"}} value="EN">English</option>
            <option style={{backgroundColor:"white",color:"black"}} value="ES">Español</option>
            <option style={{backgroundColor:"white",color:"black"}} value="FR">Français</option>
          </CustomSelect>
        </Flex>
      </HStack>
    </>
  );
};
