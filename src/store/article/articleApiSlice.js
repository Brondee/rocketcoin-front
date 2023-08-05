import { apiSlice } from "../api/apiSlice";

export const articleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => `/article/all`,
    }),
    getThreeArticles: builder.query({
      query: () => `/article/three`,
    }),
    getArticleById: builder.query({
      query: (id) => `/article/single/${id}`,
    }),
    getArticleImg: builder.mutation({
      query: (credentials) => ({
        url: `/article/img/${credentials.path}`,
        method: "POST",
        responseHandler: "text",
      }),
    }),
    addArticle: builder.mutation({
      query: (credentials) => ({
        url: "/article/add",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    uploadImg: builder.mutation({
      query: (credentials) => ({
        url: `/article/upload/${credentials.articleId}`,
        method: "POST",
        body: credentials.formData,
      }),
    }),
    incrementViews: builder.mutation({
      query: (credentials) => ({
        url: `/article/views/${credentials.articleId}`,
        method: "PATCH",
      }),
    }),
    deleteArticle: builder.mutation({
      query: (credentials) => ({
        url: `/article/del/${credentials.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetThreeArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticleImgQuery,
  useAddArticleMutation,
  useUploadImgMutation,
  useIncrementViewsMutation,
  useDeleteArticleMutation,
} = articleApiSlice;
