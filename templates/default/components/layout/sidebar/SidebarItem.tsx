import Link from "next/link";
import { Text, VStack } from "@chakra-ui/react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui";
import { LinkItemProps, SidebarItemProps } from "@/types";

const LinkItem = ({ menuName, href, isChild }: LinkItemProps) => {
  if (href !== "#") {
    return (
      <VStack alignItems="stretch" width="full">
        <Link href={href} passHref>
          <Text
            width="full"
            flex={1}
            variant="paragraphSmall"
            color="primary.400"
            padding="16px 10px"
          >
            {menuName}
          </Text>
        </Link>
      </VStack>
    );
  }

  return (
    <Text
      variant="paragraphSmall"
      padding={isChild ? "8px 10px 16px" : "16px 10px"}
    >
      {menuName}
    </Text>
  );
};

export const SidebarItem = ({
  menuName,
  href,
  subMenus,
  isLastChild,
}: SidebarItemProps) => {
  const hasSubMenus = Array.isArray(subMenus) && subMenus.length > 0;

  return (
    <AccordionItem
      value={menuName}
      padding="0"
      borderBottom={isLastChild ? "none" : "1px solid"}
      borderBottomColor="system.neutral.separator.light"
    >
      {hasSubMenus ? (
        <AccordionItemTrigger
          padding="0"
          hasAccordionIcon={hasSubMenus}
          _focus={{
            outline: "none",
            border: "none",
          }}
        >
          <LinkItem menuName={menuName} href={href} />
        </AccordionItemTrigger>
      ) : (
        <LinkItem menuName={menuName} href={href} />
      )}

      {hasSubMenus && (
        <AccordionItemContent py="0">
          {subMenus.map((subMenu) => (
            <LinkItem key={subMenu.menuName} {...subMenu} isChild />
          ))}
        </AccordionItemContent>
      )}
    </AccordionItem>
  );
};
