import { IBaseResponse } from "@/types/login";
import {
  IConfirmPensionRemitRequest,
  IConfirmPensionRemitResponse,
  IDeclinePensionRequest,
  IGetPensionItemResponse,
  IGetPensionsResponse,
  IRemitPensionResponse,
  ISendPensionOtpRequest,
  IVerifyPensionOtpRequest,
} from "@/types/pensions";
import { taxitPayApi } from "../apiSlice";

export const pensionsApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    remitPension: builder.mutation<IRemitPensionResponse, FormData>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/initiate`,
        method: "POST",
        body: data,
      }),
    }),
    confirmPensionRemit: builder.mutation<
      IConfirmPensionRemitResponse,
      IConfirmPensionRemitRequest
    >({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/notify-approvers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pensions"],
    }),
    cancelPensionRemit: builder.mutation<IBaseResponse, IConfirmPensionRemitRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/cancel-pension`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pensions"],
    }),
    getPensions: builder.query<IGetPensionsResponse, void>({
      query: () => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension`,
      providesTags: ["Pensions"],
    }),
    getPensionItem: builder.query<IGetPensionItemResponse, string>({
      query: (data) => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/byid/${data}`,
    }),
    sendPensionOtp: builder.mutation<IBaseResponse, ISendPensionOtpRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/send-approval-otp`,
        method: "POST",
        body: data,
      }),
    }),
    verifyPensionOtp: builder.mutation<IBaseResponse, IVerifyPensionOtpRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/approve`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pensions", "Profile", "Transactions"],
    }),
    declinePension: builder.mutation<IBaseResponse, IDeclinePensionRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/pension/decline`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pensions", "Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRemitPensionMutation,
  useConfirmPensionRemitMutation,
  useGetPensionsQuery,
  useGetPensionItemQuery,
  useSendPensionOtpMutation,
  useVerifyPensionOtpMutation,
  useDeclinePensionMutation,
  useCancelPensionRemitMutation,
} = pensionsApiSlice;
