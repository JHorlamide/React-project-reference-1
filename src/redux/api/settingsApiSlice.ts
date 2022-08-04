import { IBaseResponse } from "@/types/login";
import {
  IAddUserToTeamRequest,
  IAddUserToTeamResponse,
  IGetLinkedUsersResponse,
  IUpdateTeamUserRequest,
  IUpdateTeamUserResponse,
} from "@/types/settings";
import { taxitPayApi } from "../apiSlice";

export const settingsApiSlice = taxitPayApi.injectEndpoints({
  endpoints: (builder) => ({
    addUserToTeam: builder.mutation<IAddUserToTeamResponse, IAddUserToTeamRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/add-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    getLinkedUsers: builder.query<IGetLinkedUsersResponse, void>({
      query: () => `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth/my-users/all`,
      providesTags: ["Team"],
    }),
    updateTeamUser: builder.mutation<IUpdateTeamUserResponse, IUpdateTeamUserRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api/auth`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
  }),
  overrideExisting: true,
});

export const { useAddUserToTeamMutation, useGetLinkedUsersQuery, useUpdateTeamUserMutation } =
  settingsApiSlice;
