import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { getLoggedInUserDetail } from "@/api";
import { ROUTES } from "@/constants";

const UserLayout = async ({ children }: PropsWithChildren) => {
  const data = await getLoggedInUserDetail().catch(() => {});

  if (!data) {
    return redirect(ROUTES.APP.HOMEPAGE);
  }

  return children;
};

export default UserLayout;
