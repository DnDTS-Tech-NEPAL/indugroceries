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

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get user profile data from cache
  const user = queryClient.getQueryData(["user-profile"]) || "";
  const isAuthenticated = !!user;

  return { isAuthenticated, user };
};
