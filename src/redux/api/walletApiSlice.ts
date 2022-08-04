import { IBaseResponse } from "@/types/login";
import {
  IBankTransferRequest,
  IBankTransferResponse,
  IFundWalletRequest,
  IGetAllBanksResponse,
  IGetAllTransactionsRequest,
  IGetAllTransactionsResponse,
  IResendOtpRequest,
  IValidateAccountNumberRequest,
  IValidateAccountNumberResponse,
  IVerifyTransferRequest,
  IWalletTransferRequest,
  IWalletTransferResponse,
} from "@/types/wallet";
import { taxitPayApi } from "../apiSlice";

export const walletApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    fundWallet: builder.mutation<IBaseResponse, IFundWalletRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/add-fund/${data.wallet_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Transactions"],
    }),
    walletTransfer: builder.mutation<IWalletTransferResponse, IWalletTransferRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/transfer/to-wallet/${data.wallet_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Transactions"],
    }),
    bankTransfer: builder.mutation<IBankTransferResponse, IBankTransferRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/transfer/to-bank/${data.wallet_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Transactions"],
    }),
    verifyTransfer: builder.mutation<IBaseResponse, IVerifyTransferRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/transfer/verify`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Transactions"],
    }),
    resendOtp: builder.mutation<IBaseResponse, IResendOtpRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/transfer/resend-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Transactions"],
    }),
    getAllBanks: builder.query<IGetAllBanksResponse, void>({
      query: () => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/banks/all`,
    }),
    getAllTransactions: builder.query<IGetAllTransactionsResponse, IGetAllTransactionsRequest>({
      query: (data) =>
        `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/transactions/${data.wallet_id}`,
      providesTags: ["Transactions"],
      extraOptions: { maxRetries: 0 },
    }),
    validateAcctNumber: builder.query<
      IValidateAccountNumberResponse,
      IValidateAccountNumberRequest
    >({
      query: (data) =>
        `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/wallet/banks/validate?accountNumber=${data.accountNumber}&bankCode=${data.bankCode}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useFundWalletMutation,
  useWalletTransferMutation,
  useBankTransferMutation,
  useVerifyTransferMutation,
  useGetAllBanksQuery,
  useValidateAcctNumberQuery,
  useResendOtpMutation,
  useGetAllTransactionsQuery,
} = walletApiSlice;
