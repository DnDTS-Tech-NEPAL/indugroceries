import Link from "next/link";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import { ArrowDownIcon } from "@/assets/svg";

// Types
export interface SubMenuItem {
  child_display_name: string;
  child_redirect_link: string;
}

export interface NavItemProps {
  menuName: string;
  menu_redirect_link: string;
  is_mega_menu: boolean;
  children: SubMenuItem[];
}

export const NavItem = ({
  menu_redirect_link,
  menuName,
  children,
}: NavItemProps) => {
  const hasSubMenus = Array.isArray(children) && children.length > 0;

  return (
    <Box position="relative" className="group">
      <HStack cursor="pointer" color="primary.400" >
        <Link href={menu_redirect_link}>
          <Text
            variant="subtitle2"
            fontWeight="400"
            color="system.text.dark.light"
            padding="8px 12px"
            fontSize={{
              base: "12px",
              md: "14px",
              lg: "16px",
            }}
          >
            {menuName}
          </Text>
        </Link>

        {hasSubMenus && <ArrowDownIcon color="black" />}
      </HStack>

      {hasSubMenus && (
        <VStack
          key={menuName}
          position="absolute"
          top="100%"
          display="none"
          alignItems="stretch"
          gap="0"
          border="1px solid"
          borderColor="system.neutral.separator.light"
          borderBottom="none"
          minWidth="200px"
          background="white"
          color="system.text.dark.light"
          zIndex={10}
          _groupHover={{
            display: "flex",
          }}
        >
          {children.map(({ child_display_name, child_redirect_link }) => (
            <Link key={child_display_name} href={child_redirect_link}>
              <Text
                variant="paragraphSmall"
                padding="16px 10px"
                borderBottom="1px solid"
                borderBottomColor="system.neutral.separator.light"
                fontSize="14px"
              >
                {child_display_name}
              </Text>
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
};
