import { IBaseResponse } from "@/types/login";
import { IGetAllPayslipsRes, IGetSinglePayslipRes, IGetSingleSlipRes } from "@/types/payslips";
import { taxitPayApi } from "../apiSlice";

export const payslipsApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayslip: builder.mutation<IBaseResponse, FormData>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payslip/schedule`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payslips", "Profile"],
    }),
    getAllPayslips: builder.query<IGetAllPayslipsRes, void>({
      query: () => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payslip`,
      providesTags: ["Payslips"],
    }),
    getSinglePayslip: builder.query<IGetSinglePayslipRes, string>({
      query: (data) => `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payslip/${data}`,
      providesTags: ["Payslips"],
    }),
    getSingleSlip: builder.query<IGetSingleSlipRes, { parent: string; child: string }>({
      query: (data) =>
        `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/payslip/${data.parent}/${data.child}`,
      providesTags: ["Payslips"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useInitiatePayslipMutation,
  useGetAllPayslipsQuery,
  useGetSinglePayslipQuery,
  useGetSingleSlipQuery,
} = payslipsApiSlice;
