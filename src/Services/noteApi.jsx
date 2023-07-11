import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notes-app-website.onrender.com/api/v1/notes",
  }),
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/createnotes",
          method: "post",
          body: data,
        };
      },
    }),
    allNote: builder.query({
      query: () => {
        return {
          url: "/allnotes",
        };
      },
    }),
    userAllNote: builder.query({
      query: (id) => {
        return {
          url: `/userallnotes/${id}`,
        };
      },
    }),
    deleteNote: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/deletenotes/${id}`,
          method: "delete",
        };
      },
    }),
    updateNote: builder.mutation({
      query: (data) => {
        console.log(data.data);
        return {
          url: `/updatenotes/${data?._id}`,
          method: "put",
          body: data?.data,
        };
      },
    }),
  }),
});
export const {
  useCreateNoteMutation,
  useAllNoteQuery,
  useUserAllNoteQuery,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = noteApi;
