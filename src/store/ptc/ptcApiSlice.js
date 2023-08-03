import { apiSlice } from "../api/apiSlice";

export const ptcApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPtc: builder.query({
      query: (type) => `/ptc/all/${type}`,
    }),
    getPtcById: builder.query({
      query: (id) => `/ptc/single/${id}`,
    }),
    addPtc: builder.mutation({
      query: (credentials) => ({
        url: "/ptc/add",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    setClaimed: builder.mutation({
      query: (credentials) => ({
        url: "/ptc/claimed",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useAddPtcMutation,
  useGetPtcQuery,
  useGetPtcByIdQuery,
  useSetClaimedMutation,
} = ptcApiSlice;
