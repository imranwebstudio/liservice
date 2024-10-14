import { baseApi } from "../../api/baseApi"


const authorization = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: "user/login",
                method: "POST",
                body: data
            }),
        }),
        register: build.mutation({
            query: (data) => ({
                url: "user/register",
                method: "POST",
                body: data
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = authorization