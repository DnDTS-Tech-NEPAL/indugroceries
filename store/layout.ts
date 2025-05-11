import { create } from "zustand";

import {
  EmailVerificationStore,
  LayoutDialogStore,
  LayoutSignupDialogStore,
  OtpEmailStore,
  OtpVerifiedEmailStore,
} from "@/types/store/layout";

export const useLayoutDialogStore = create<LayoutDialogStore>((set) => ({
  signInOpen: false,
  updateSignInOpen: (signInOpen) => set(() => ({ signInOpen })),
}));

export const useRegisterDialogStore = create<LayoutSignupDialogStore>(
  (set) => ({
    signUpOpen: false,
    updateSignUpOpen: (signUpOpen) => set(() => ({ signUpOpen })),
  })
);

export const useVerifyEmailStore = create<EmailVerificationStore>((set) => ({
  verifyEmail: "",
  setVerifyEmail: (verifyEmail) => set(() => ({ verifyEmail })),
}));

export const useOtpEmailStore = create<OtpEmailStore>((set) => ({
  otpEmail: "",
  setOtpEmail: (email) => set(() => ({ otpEmail: email })),
}));

export const useOtpVerifiedEmailStore = create<OtpVerifiedEmailStore>(
  (set) => ({
    verifiedEmail: "",
    setVerifiedEmail: (email: string) => set(() => ({ verifiedEmail: email })),
  })
);
