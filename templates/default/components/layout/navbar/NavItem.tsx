import Link from "next/link";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import { ArrowDownIcon } from "@/assets/svg";

// Types
export interface SubMenuItem {
  label: string;
  link: string;
}

export interface NavItemProps {
  menuName: string;
  href: string;
  isMega: boolean;
  subMenus: SubMenuItem[];
}

export const NavItem = ({ href, menuName, subMenus }: NavItemProps) => {
  const hasSubMenus = Array.isArray(subMenus) && subMenus.length > 0;

  return (
    <Box position="relative" className="group">
      <HStack cursor="pointer" color="primary.400">
        <Link href={href}>
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

        {hasSubMenus && <ArrowDownIcon />}
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
          _groupHover={{
            display: "flex",
          }}
        >
          {subMenus.map(({ label, link }) => (
            <Link key={label} href={link}>
              <Text
                variant="paragraphSmall"
                padding="16px 10px"
                borderBottom="1px solid"
                borderBottomColor="system.neutral.separator.light"
                fontSize="14px"
              >
                {label}
              </Text>
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
};
