import { IBaseResponse } from "@/types/login";
import {
  IResetPasswordRequest,
  IVerifyResetPasswordOtpRequest,
  IVerifyResetPasswordRequest,
} from "@/types/reset";
import { taxitPayApi } from "../apiSlice";

export const resetApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<IBaseResponse, IResetPasswordRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/reset-password-email`,
        method: "POST",
        body: data,
      }),
    }),
    verifyResetPasswordOtp: builder.mutation<IBaseResponse, IVerifyResetPasswordOtpRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/otp-verify`,
        method: "POST",
        body: data,
      }),
    }),
    verifyResetPassword: builder.mutation<IBaseResponse, IVerifyResetPasswordRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useResetPasswordMutation,
  useVerifyResetPasswordMutation,
  useVerifyResetPasswordOtpMutation,
} = resetApiSlice;
