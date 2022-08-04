import { IBaseResponse } from "@/types/login";
import {
  IGetUserProfileResponse,
  IResendAuthOtpRequest,
  IUpdateBusinessUserRequest,
  IUpdateIndividualUserRequest,
  IUpdateUserResponse,
} from "@/types/profile";
import { taxitPayApi } from "../apiSlice";

export const profileApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<IGetUserProfileResponse, void>({
      query: () => `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/profile`,
      providesTags: ["Profile"],
      extraOptions: { maxRetries: 0 },
    }),
    getUserProfileUnAuth: builder.query<IGetUserProfileResponse, void>({
      query: () => `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/profile`,
      providesTags: ["UnAuthProfile"],
    }),
    resendAuthOtp: builder.mutation<IBaseResponse, IResendAuthOtpRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/resend-otp`,
        method: "POST",
        body: data,
      }),
    }),
    
    updateUser: builder.mutation<
      IUpdateUserResponse,
      IUpdateBusinessUserRequest | IUpdateIndividualUserRequest
    >({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/update-users`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserProfileQuery,
  useGetUserProfileUnAuthQuery,
  useResendAuthOtpMutation,
  useUpdateUserMutation,
} = profileApiSlice;
