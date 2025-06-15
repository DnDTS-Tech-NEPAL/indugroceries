type NavMenuItemType = {
  menuname: string;
  menu_redirect_link: string;
  is_mega_menu: number;
  children: {
    child_display_name: string;
    child_redirect_link: string;
  }[];
};

export const extractMenu = (data?: NavMenuItemType[]) => {
  if (!data) return [];

  return data.map((item) => ({
    menuName: item.menuname,
    href: item.menu_redirect_link,
    isMega: item.is_mega_menu === 1,
    subMenus: Array.isArray(item.children)
      ? item.children.map((child) => ({
          child_display_name: child.child_display_name,
          child_redirect_link: child.child_redirect_link,
        }))
      : [],
  }));
};
