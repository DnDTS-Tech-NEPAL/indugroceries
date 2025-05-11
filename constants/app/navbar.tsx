import { HeartIcon, SearchIcon, CartIcon, MenuIcon } from "@/assets/svg";

import { ROUTES } from "../routes";

export const navbarIconsList = [
  {
    name: "Search",
    icon: <SearchIcon />,
    href: ROUTES.DEFAULT,
  },
  {
    name: "Favorite",
    icon: <HeartIcon />,
    href: ROUTES.APP.FAVORITE,
  },
  {
    name: "Cart",
    icon: <CartIcon />,
    href: ROUTES.USER.CART,
  },
  {
    name: "Menu",
    icon: <MenuIcon />,
    href: "#",
  },
];
