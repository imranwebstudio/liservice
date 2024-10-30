/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { BaseApi } from "../baseApi";


const baseQuery = fetchBaseQuery({
  baseUrl: `${BaseApi}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens as unknown as { accessToken: string };
    // console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> =
  async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 404) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }

    if (result?.error?.status === 401) {
      console.log('Sending refresh token');
      try {
        const res = await axios.post(
          `${BaseApi}/refresh`,
          {}, // Your request body goes here if needed
          {
            withCredentials: true,
          }
        );

        const data = res?.data;
        // console.log(data.data.data.accessToken);
        if (data?.data?.accessToken) {
          const user = (api.getState() as RootState).auth.user;

          api.dispatch(
            setUser({
              user,
              tokens: data.data.data.accessToken,
            })
          );

          result = await baseQuery(args, api, extraOptions);
        }
        // Remove the logout dispatch here
      } catch (error) {
        console.error("Refresh token request failed:", error);
        // Handle the error as needed, such as showing a notification
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Session Expired',
        //   text: 'Please log in again.',
        // });
        // You might also want to redirect the user or show a login modal here
      }
    }

    return result;
  };


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['User', 'services', 'balance'],
  endpoints: () => ({})
});