import { HeartIcon, SearchIcon, CartIcon, MenuIcon } from "@/assets/svg";

import { ROUTES } from "../routes";

export const navbarIconsList = [
  {
    name: "Search",
    icon: <SearchIcon color="black" />,
    href: ROUTES.DEFAULT,
  },
  {
    name: "Favorite",
    icon: <HeartIcon color="black" />,
    href: ROUTES.APP.FAVORITE,
  },
  {
    name: "Cart",
    icon: <CartIcon color="black" />,
    href: ROUTES.USER.CART,
  },
  {
    name: "Menu",
    icon: <MenuIcon />,
    href: "#",
  },
];
