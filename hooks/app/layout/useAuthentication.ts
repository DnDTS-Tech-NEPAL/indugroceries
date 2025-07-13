"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getOrCreateGuestId } from "@/utils/guest"; // if needed

export const useAuthentication = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const authenticate = (restrictedRoute: string, callback: VoidFunction) => {
    const userData = queryClient.getQueryData(["user-profile"]);

    // If no logged-in user, check for guestId
    if (!userData) {
      const guestId = getOrCreateGuestId();
      console.log("guestId", guestId);
      if (!guestId) return callback(); // truly unauthenticated
    }

    // Either logged-in or guest: allow
    router.push(restrictedRoute);
  };

  return {
    authenticate,
  };
};
