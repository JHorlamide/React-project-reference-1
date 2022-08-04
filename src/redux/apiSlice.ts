import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const taxitPayApi = createApi({
  reducerPath: "taxitPayApi",
  tagTypes: [
    "Profile",
    "UnAuthProfile",
    "Team",
    "Transactions",
    "Pensions",
    "Payslips",
    "Payroll",
    "Links",
  ],
  baseQuery: fetchBaseQuery({
    // baseUrl: "${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api",
    prepareHeaders: async (headers, { getState }) => {
      const isBrowser = typeof window !== undefined;
      const token =
        (getState() as RootState).auth.token ||
        (isBrowser
          ? sessionStorage.getItem("taxitPayToken") || localStorage.getItem("taxitPayToken")
          : null);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  // refetchOnFocus: true,
  refetchOnReconnect: true,
});
