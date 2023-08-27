import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

let refreshTokenState;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_REQUEST_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token =
      sessionStorage.getItem("accessToken") || getState().auth.token;
    refreshTokenState =
      sessionStorage.getItem("refreshToken") || getState().auth.refreshToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    api.dispatch(
      setCredentials({
        accessToken: refreshTokenState,
        refreshToken: null,
        email: null,
      })
    );
    sessionStorage.setItem("accessToken", refreshTokenState);
    const refreshRes = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshRes?.data) {
      const email = api.getState().auth.email;

      api.dispatch(setCredentials({ ...refreshRes.data, email }));
      sessionStorage.setItem("accessToken", refreshRes.data.access_token);
      sessionStorage.setItem("refreshToken", refreshRes.data.refresh_token);
      console.log(refreshRes.data);
      result = await baseQuery(args, api, extraOptions);
    } else {
      sessionStorage.setItem("accessToken", null);
      sessionStorage.setItem("refreshToken", null);
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
