import { AuthReqField, createUserField, IAuth } from "../types/auth";
import { createApi} from "@reduxjs/toolkit/query/react";
import { IAccount } from "../types/account";
import { baseQueryWithReauth} from './baseQuery';


export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Accounts'],
  endpoints: (builder) => ({
    createUser: builder.mutation<createUserField, createUserField>({
      query: (user) => ({
        url: `auth/users/`,
        method: "POST",
        body: user
      }),
    }),
    authUser: builder.mutation<  IAuth,  AuthReqField>({
      query: (user) => ({
        url: `api/login/`,
        method: "POST",
        body: user
      }),
      invalidatesTags: ['Accounts']
    }),
    createAccount: builder.mutation< IAccount,  null >({
      query: () => ({
        url: `accounts/`,
        method: "POST",
      }),
      invalidatesTags: ['Accounts']
    }),
    deleteAccount: builder.mutation< null, string >({
      query: (id) => ({
        url: `accounts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Accounts']
    }),

    getAccounts: builder.query<IAccount[], null>({
      query: () => ({
        url: `/accounts/`,
      }),
      providesTags: result => ['Accounts']
    }),

    isAuth: builder.query<IAccount[], null>({
      query: () => ({
        url: `/accounts/`,
      }),
      providesTags: result => ['Accounts']
    }),

   }),
});
