import { apiSlice } from "../api/apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/task/all",
    }),
    getApproveTasks: builder.query({
      query: () => "/task/all_approve",
    }),
    getTaskById: builder.query({
      query: (id) => `/task/single/${id}`,
    }),
    getTaskApproveById: builder.query({
      query: (id) => `/task/single_approve/${id}`,
    }),
    addApproveTask: builder.mutation({
      query: (credentials) => ({
        url: `/task/approve_add/${credentials.taskId}`,
        method: "POST",
        body: { dopInfo: credentials.dopInfo },
      }),
    }),
    addTask: builder.mutation({
      query: (credentials) => ({
        url: "/task/add",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    editApprove: builder.mutation({
      query: (credentials) => ({
        url: "/task/edit",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    uploadFile: builder.mutation({
      query: (credentials) => ({
        url: `/task/upload/${credentials.taskApproveId}`,
        method: "POST",
        body: credentials.formData,
      }),
    }),
    getTaskFile: builder.mutation({
      query: (credentials) => ({
        url: `/task/file/${credentials.path}`,
        method: "POST",
        responseHandler: "text",
      }),
    }),
    deleteTaskApprove: builder.mutation({
      query: (id) => ({
        url: `/task/del/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetApproveTasksQuery,
  useGetTaskByIdQuery,
  useGetTaskApproveByIdQuery,
  useAddApproveTaskMutation,
  useAddTaskMutation,
  useEditApproveMutation,
  useUploadFileMutation,
  useGetTaskFileMutation,
  useDeleteTaskApproveMutation,
} = taskApiSlice;
