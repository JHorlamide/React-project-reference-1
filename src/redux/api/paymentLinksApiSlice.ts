import { IBaseResponse } from "@/types/login";
import {
  IGeneratePaymentLinkRequest,
  IGeneratePaymentLinkResponse,
  IGetAllPaymentLinksResponse,
  IGetPaymentByLinkResponse,
  IGetPaymentLinkByRefResponse,
  IMakePaymentRequest,
} from "@/types/paymentLinks";
import { taxitPayApi } from "../apiSlice";

export const paymentLinksApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    generatePaymentLink: builder.mutation<
      IGeneratePaymentLinkResponse,
      IGeneratePaymentLinkRequest
    >({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payment-link`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Links"],
    }),
    makePayment: builder.mutation<IBaseResponse, IMakePaymentRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payment-link/make-payment/${data.walletId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Links"],
    }),
    getAllPaymentLinks: builder.query<IGetAllPaymentLinksResponse, void>({
      query: () => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payment-link`,
      providesTags: ["Links"],
    }),
    getPaymentLinkByRef: builder.query<IGetPaymentLinkByRefResponse, string>({
      query: (data) => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payment-link/${data}`,
      providesTags: ["Links"],
    }),
    getPaymentByLink: builder.query<IGetPaymentByLinkResponse, string>({
      query: (data) =>
        `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payment-link/payments/${data}`,
      providesTags: ["Links"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGeneratePaymentLinkMutation,
  useGetAllPaymentLinksQuery,
  useGetPaymentLinkByRefQuery,
  useMakePaymentMutation,
  useGetPaymentByLinkQuery,
} = paymentLinksApiSlice;
