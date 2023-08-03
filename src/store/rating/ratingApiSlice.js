import { apiSlice } from "../api/apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRatingInfo: builder.query({
      query: () => "/rating/info",
    }),
    editRating: builder.mutation({
      query: (credentials) => ({
        url: "/rating/edit",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetRatingInfoQuery, useEditRatingMutation } = ratingApiSlice;
