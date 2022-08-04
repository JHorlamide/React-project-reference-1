import { IUploadRequest, IUploadResponse } from "@/types/upload";
import { taxitPayApi } from "../apiSlice";

export const uploadApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IUploadResponse, FormData>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useUploadFileMutation } = uploadApiSlice;
