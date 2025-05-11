import { CallIcon, LocationIcon, SmsIcon } from "@/assets/svg";
import { useConfigQuery } from "@/hooks/api";

export const useContactsList = () => {
  const { data: config } = useConfigQuery();

  return [
    {
      name: "Location",
      label: config.location,
      icon: <LocationIcon />,
    },
    {
      name: "Email",
      label: config.company_contact_email,
      icon: <SmsIcon />,
    },
    {
      name: "Contact",
      label: config.contact_number,
      icon: <CallIcon />,
    },
  ];
};
