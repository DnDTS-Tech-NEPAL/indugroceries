import { resendOtp, setpassword, register, verifyemail } from "@/api";
import { toaster } from "@/components";
import { ApiErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.message,
        type: "success",
      });
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};

export const useEmailVerifyMutation = () => {
  return useMutation({
    mutationFn: verifyemail,
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.auth?.message,
        type: "success",
      });
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};

export const useSetPasswordMutation = () => {
  return useMutation({
    mutationFn: setpassword,
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.message,
        type: "success",
      });
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.message,
        type: "success",
      });
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};
