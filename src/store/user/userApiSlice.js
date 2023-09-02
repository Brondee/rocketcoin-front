import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => "/user/info",
    }),
    updateUserInfo: builder.mutation({
      query: (credentials) => ({
        url: "/user/edit",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    addUserTokens: builder.mutation({
      query: (credentials) => ({
        url: "/user/tokens",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    addUserTokensDif: builder.mutation({
      query: (credentials) => ({
        url: `/user/tokens_dif/${credentials.userId}`,
        method: "PATCH",
        body: { tokens: credentials.tokens },
      }),
    }),
    levelUpUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/levelup",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    levelUpUserDif: builder.mutation({
      query: (credentials) => ({
        url: `/user/levelup_dif/${credentials.userId}`,
        method: "PATCH",
        body: { exp: credentials.exp },
      }),
    }),
    incrementCount: builder.mutation({
      query: (credentials) => ({
        url: "/user/increment",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    reduceTokens: builder.mutation({
      query: (credentials) => ({
        url: "/user/reduce",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useAddUserTokensMutation,
  useAddUserTokensDifMutation,
  useLevelUpUserMutation,
  useLevelUpUserDifMutation,
  useIncrementCountMutation,
  useReduceTokensMutation,
} = userApiSlice;
