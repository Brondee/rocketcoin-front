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
    levelUpUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/levelup",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    incrementCount: builder.mutation({
      query: (credentials) => ({
        url: "/user/increment",
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
  useLevelUpUserMutation,
  useIncrementCountMutation,
} = userApiSlice;
