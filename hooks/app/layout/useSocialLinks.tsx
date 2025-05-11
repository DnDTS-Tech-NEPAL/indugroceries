import { FacebookIcon, InstagramIcon, TiktokIcon } from "@/assets/svg";
import { useConfigQuery } from "@/hooks/api";

export const useSocialLinks = () => {
  const { data: config } = useConfigQuery();

  return [
    {
      name: "Facebook",
      href: config.facebook,
      icon: <FacebookIcon />,
    },
    {
      name: "Instagram",
      href: config.company_contact_instagram,
      icon: <InstagramIcon />,
    },
    {
      name: "TikTok",
      href: config.tiktok,
      icon: <TiktokIcon />,
    },
  ];
};
