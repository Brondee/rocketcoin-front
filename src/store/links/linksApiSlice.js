import { apiSlice } from "../api/apiSlice";

export const linksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setLinkReward: builder.mutation({
      query: (credentials) => ({
        url: "/apis/links",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getLinksInfo: builder.query({
      query: (ip) => `/apis/links_info?ip=${ip}`,
    }),
  }),
});

export const { useSetLinkRewardMutation, useGetLinksInfoQuery } = linksApiSlice;
