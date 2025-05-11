"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useAuthentication = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // only proceed to restricted route if user is authenticated
  const authenticate = (restrictedRoute: string, callback: VoidFunction) => {
    const userData = queryClient.getQueryData(["user-profile"]);

    if (!userData) return callback();
    router.push(restrictedRoute);
  };

  return {
    authenticate,
  };
};
