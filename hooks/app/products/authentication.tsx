import { useQueryClient } from "@tanstack/react-query";
import { useLayoutDialogStore } from "@/store";

export const useAuthCheck = () => {
  const queryClient = useQueryClient();
  const { updateSignInOpen } = useLayoutDialogStore();

  const checkAuth = (callback: () => void) => {
    return () => {
      const isAuthenticated = !!queryClient.getQueryData(["user-profile"]);

      if (isAuthenticated) {
        callback();
      } else {
        updateSignInOpen(true);
      }
    };
  };

  return { checkAuth };
};
