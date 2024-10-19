/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import axios from "axios";
import Swal from "sweetalert2";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
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

  if(result?.error?.status === 404){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }

  if (result?.error?.status === 401) {
    console.log('Sending refresh token');

    const res = await axios.post(
      "http://localhost:5000/refresh",
      {}, // Your request body goes here if needed
      {
        withCredentials: true,
      }
    );

    const data = res?.data;

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    }
    else {
      api.dispatch(logout())
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