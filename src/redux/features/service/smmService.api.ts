/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { smmServerApi } from "../../baseApi";

export const smmServiceApi = createApi({
  reducerPath: 'smmServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: smmServerApi }),
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services",
    }),
  }),
});


export const { useGetServicesQuery } = smmServiceApi as any;