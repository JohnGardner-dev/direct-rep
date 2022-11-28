import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lettersApi = createApi({
  reducerPath: "letter",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LETTERS_API_HOST,
  }),
  tagTypes: ["LettersList"],
  endpoints: (builder) => ({
    getLetters: builder.query({
      query: () => "/api/letters",
      // providesTags: ['LettersList'],
    }),
    createLetter: builder.mutation({
      query: (data) => ({
        url: "/api/letters",
        body: data,
        method: "post",
      }),
      // invalidatesTags: ['LettersList'],
    }),
  }),
});

export const { useGetLettersQuery, useCreateLetterMutation } = lettersApi;
