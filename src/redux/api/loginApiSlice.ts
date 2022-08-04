import {
  ILoginRequest,
  ILoginResponse,
  IVerifyLoginRequest,
  IVerifyLoginResponse,
} from "@/types/login";
import { taxitPayApi } from "../apiSlice";

export const loginApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    verifyLogin: builder.mutation<IVerifyLoginResponse, IVerifyLoginRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/verify-login-2fa`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginUserMutation, useVerifyLoginMutation } = loginApiSlice;
