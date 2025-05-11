export const useLayout = () => {
  return [
    {
      menuName: "Category",
      href: "#",
      subMenus: [
        {
          menuName: "Category 1",
          href: "/category/1",
        },
        {
          menuName: "Category 2",
          href: "/category/2",
        },
      ],
    },
    {
      menuName: "Products",
      href: "#",
      subMenus: [
        {
          menuName: "Basic Cotton T-Shirt",
          href: "/products/1",
        },
        {
          menuName: "V-Neck T-Shirt",
          href: "/products/2",
        },
        {
          menuName: "Polo Shirt",
          href: "/products/3",
        },
        {
          menuName: "Denim Shirt",
          href: "/products/4",
        },
      ],
    },
    {
      menuName: "FAQ's",
      href: "/faq",
    },
    {
      menuName: "About Us",
      href: "/about-us",
    },
    {
      menuName: "Contact Us",
      href: "/contact-us",
    },
  ];
};
