import Image from "next/image";
import { useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";

import { CloseCircleIcon } from "@/assets/svg";
import { AccordionRoot, Drawer } from "@/components";
import { useConfigQuery } from "@/hooks/api";
import { SidebarProps } from "@/types";

import { SidebarItem } from "./SidebarItem";
import { calculateHeightAndWidth, extractMenu } from "@/utils";

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { data: config } = useConfigQuery();
  const navItems = extractMenu(config.menu_table);
  const { height, width } = calculateHeightAndWidth(
    config.width,
    config.height
  );

  useEffect(() => {
    window.addEventListener("resize", onClose);
    return () => window.removeEventListener("resize", onClose);
  }, []);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement="start"
      hasHeader={false}
      hasFooter={false}
      hasCloseIcon={false}
    >
      <VStack
        alignItems="stretch"
        gap="24px"
        padding="20px 16px"
        color="primary.400"
      >
        <HStack justifyContent="space-between" color="danger.100">
          <Box position="relative" width={`${width}px`} height={`${height}px`}>
            <Image
              src={config.company_details_url}
              alt={config.company_details_name}
              fill
              loading="eager"
            />
          </Box>

          <CloseCircleIcon onClick={onClose} />
        </HStack>

        <AccordionRoot collapsible>
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.menuName}
              {...navItem}
              isLastChild={index === navItems.length - 1}
            />
          ))}
        </AccordionRoot>
      </VStack>
    </Drawer>
  );
};
