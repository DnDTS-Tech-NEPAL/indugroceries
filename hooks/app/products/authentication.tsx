import { useQueryClient } from "@tanstack/react-query";
import { useLayoutDialogStore } from "@/store";
import { getOrCreateGuestId } from "@/utils/guest";
import { useRouter } from "next/navigation";

// useAuthCheck
export const useAuthCheck = () => {
  const queryClient = useQueryClient();
  const { updateSignInOpen } = useLayoutDialogStore();
  const router = useRouter();

  const checkAuth = (callback: () => void) => () => {
    const user = queryClient.getQueryData(["user-profile"]);
    const guestId = localStorage.getItem("guest_id");

    const isAuthenticated = !!user || !!guestId;

    if (isAuthenticated) {
      callback();
    } else {
      updateSignInOpen(true);
    }
  };
  const checkUserAuth = (callback: () => void) => () => {
    const user = queryClient.getQueryData(["user-profile"]);
    const isAuthenticated = !!user;
    if (isAuthenticated) {
      callback();
    } else {
      updateSignInOpen(true); // ✅ Opens modal
    }
  };

  const checkAuthAndRedirect = (path: string) => () => {
    const user = queryClient.getQueryData(["user-profile"]);
    const guestId = localStorage.getItem("guest_id");

    const isAuthenticated = !!user || !!guestId;

    if (isAuthenticated) {
      router.push(path);
    } else {
      updateSignInOpen(true);
    }
  };

  return { checkAuth, checkAuthAndRedirect, checkUserAuth };
};

// useAuth
export const useAuth = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user-profile"]) || null;
  const guestId = typeof window !== "undefined" ? getOrCreateGuestId() : null;

  const isAuthenticated = !!user || !!guestId;
  const isGuest = !user && !!guestId;

  return { user, guestId, isAuthenticated, isGuest };
};
