import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_USERS_API_HOST,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/api/accounts",
        body: data,
        method: "post",
      }),
    }),
  }),
});

export const {useCreateUserMutation } = usersApi;