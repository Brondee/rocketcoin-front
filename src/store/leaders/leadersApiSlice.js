import { apiSlice } from "../api/apiSlice";

export const leadersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeadersInfo: builder.query({
      query: () => "/leaders/info",
    }),
  }),
});

export const { useGetLeadersInfoQuery } = leadersApiSlice;
