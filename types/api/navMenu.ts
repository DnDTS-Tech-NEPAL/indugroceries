export type MenuChildType = {
  child_display_name: string;
  child_redirect_link: string;
};

export type NavMenuItemType = {
  menuname: string;
  menu_redirect_link: string;
  is_mega_menu: number;
  children: MenuChildType[];
};

export type NavmenuAPIResponse = {
  Data: NavMenuItemType[];
};