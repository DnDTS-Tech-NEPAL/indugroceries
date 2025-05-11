export type LayoutDialogState = {
  signInOpen: boolean;
};

export type LayoutDialogActions = {
  updateSignInOpen: (variant: boolean) => void;
};

export type LayoutDialogStore = LayoutDialogState & LayoutDialogActions;

export type LayoutSignUpDialogState = {
  signUpOpen: boolean;
};

export type LayoutSignUpDialogActions = {
  updateSignUpOpen: (variant: boolean) => void;
};

export type LayoutSignupDialogStore = LayoutSignUpDialogState &
  LayoutSignUpDialogActions;

export type EmailVerificationState = {
  verifyEmail: string;
};

export type EmailVerificationActions = {
  setVerifyEmail: (variant: string) => void;
};

export type EmailVerificationStore = EmailVerificationState &
  EmailVerificationActions;

export type OtpEmailStore = {
  otpEmail: string;
  setOtpEmail: (email: string) => void;
};

export type OtpVerifiedEmailStore = {
  verifiedEmail: string;
  setVerifiedEmail: (email: string) => void;
};
