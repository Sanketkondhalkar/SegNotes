import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notes-app-website.onrender.com/api/v1/auth",
  }),
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "post",
          body: data,
        };
      },
    }),
    Register: builder.mutation({
      query: (data) => {
        return {
          url: "/register",
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
