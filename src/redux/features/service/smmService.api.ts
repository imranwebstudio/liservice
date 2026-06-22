/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const smmServerApi = import.meta.env.VITE_SMM_SERVER_API;
// console.log("SMM Server API:", smmServerApi);

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