import { FC, SVGProps } from "react";

export type SidebarItem = {
  id: string;
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  active: boolean;
};
