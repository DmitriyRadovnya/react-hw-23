import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_BASE_TOKEN;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks", "CurrentTask"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/todos",
      transformResponse: (response) => response.data,
      providesTags: ["Tasks"],
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/todos/${id}`,
        transformResponse: (response) => response,
        providesTags: ["CurrentTask"],
        keepUnusedDataFor: 5,
      }),
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/todos",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    completeTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: ({ id, newTitle }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { title: newTitle },
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useEditTaskMutation,
} = api;
