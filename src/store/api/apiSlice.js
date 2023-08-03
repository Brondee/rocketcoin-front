import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

let refreshTokenState;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_REQUEST_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken") || getState().auth.token;
    refreshTokenState =
      localStorage.getItem("refreshToken") || getState().auth.refreshToken;
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
    localStorage.setItem("accessToken", refreshTokenState);
    const refreshRes = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshRes?.data) {
      const email = api.getState().auth.email;

      api.dispatch(setCredentials({ ...refreshRes.data, email }));
      localStorage.setItem("accessToken", refreshRes.data.access_token);
      localStorage.setItem("refreshToken", refreshRes.data.refresh_token);
      console.log(refreshRes.data);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.setItem("accessToken", null);
      localStorage.setItem("refreshToken", null);
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
