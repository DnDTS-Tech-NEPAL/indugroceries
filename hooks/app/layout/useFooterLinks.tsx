import { FooterFacebookIcon, FooterInstagramIcon, FooterTiktokIcon, YoutubeIcon,  } from "@/assets/svg";
import { useConfigQuery } from "@/hooks/api";

export const useFooterLinks = () => {
  const { data: config } = useConfigQuery();

  return [
   
    {
      name: "Instagram",
      href: config.company_contact_instagram,
      icon: <FooterInstagramIcon />,
    },
    {
      name: "TikTok",
      href: config.tiktok,
      icon: <FooterTiktokIcon />,
    },
     {
      name: "Facebook",
      href: config.facebook,
      icon: <FooterFacebookIcon />,
    },
      {
      name: "YouTube",
      href: config.company_contact_youtube,
      icon:<YoutubeIcon/>
    },
  ];
};
