import { apiSlice } from "../api/apiSlice";

export const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: () => "/file/all",
    }),
    getApproveFiles: builder.query({
      query: () => "/file/all_approve",
    }),
    getFileById: builder.query({
      query: (id) => `/file/single/${id}`,
    }),
    getFileApproveById: builder.query({
      query: (id) => `/file/single_approve/${id}`,
    }),
    addApproveFile: builder.mutation({
      query: (fileId) => ({
        url: `/file/approve_add/${fileId}`,
        method: "POST",
      }),
    }),
    addFile: builder.mutation({
      query: (credentials) => ({
        url: "/file/add",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    editFileApprove: builder.mutation({
      query: (credentials) => ({
        url: "/file/edit",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    uploadScreen: builder.mutation({
      query: (credentials) => ({
        url: `/file/upload/${credentials.fileApproveId}`,
        method: "POST",
        body: credentials.formData,
      }),
    }),
    getFileImg: builder.mutation({
      query: (credentials) => ({
        url: `/file/file/${credentials.path}`,
        method: "POST",
        responseHandler: "text",
      }),
    }),
    deleteFileApprove: builder.mutation({
      query: (id) => ({
        url: `/file/del/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetApproveFilesQuery,
  useGetFileByIdQuery,
  useGetFileApproveByIdQuery,
  useAddApproveFileMutation,
  useAddFileMutation,
  useEditFileApproveMutation,
  useUploadScreenMutation,
  useGetFileImgMutation,
  useDeleteFileApproveMutation,
} = fileApiSlice;
