import {
  IRegisterCorporationUserRequest,
  IRegisterIndividualUserRequest,
  IRegisterUserResponse,
  IVerifyUserEmailRequest,
  IVerifyUserEmailResponse,
} from "@/types/register";
import { taxitPayApi } from "../apiSlice";

export const registerApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    registerIndividualUser: builder.mutation<IRegisterUserResponse, IRegisterIndividualUserRequest>(
      {
        query: (data) => ({
          url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/register`,
          method: "POST",
          body: data,
        }),
      }
    ),
    registerCorporationUser: builder.mutation<
      IRegisterUserResponse,
      IRegisterCorporationUserRequest
    >({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    verifyUserEmail: builder.mutation<IVerifyUserEmailResponse, IVerifyUserEmailRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterIndividualUserMutation,
  useRegisterCorporationUserMutation,
  useVerifyUserEmailMutation,
} = registerApiSlice;
