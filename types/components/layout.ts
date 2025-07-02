import React from "react";

import { ConfigType } from "../config";
import { IconType } from "react-icons";

export type LayoutProps = {
  children: React.ReactNode;
  config: ConfigType;
};

export type NavItemProps = {
  href: string;
  menuName: string;
  subMenus?: NavItemProps[];
};

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type SidebarItemProps = NavItemProps & {
  isLastChild: boolean;
  id?: string | number;
  label?: string;
  icon?: IconType;
  active?: boolean;
  items?: NavItemProps[];
  onSelect?: (id: string | number) => void;
};

export type LinkItemProps = {
  menuName: string;
  href: string;
  isChild?: boolean;
};
