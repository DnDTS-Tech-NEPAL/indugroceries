import { MenuItemType } from "@/types";

export const extractMenu = (menu: MenuItemType[]) => {
  return menu.map(({ link, menu_item }: MenuItemType) => ({
    href: link || "#",
    menuName: menu_item,
    subMenus: [],
  }));
};
