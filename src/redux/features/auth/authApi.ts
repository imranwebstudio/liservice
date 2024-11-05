
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
        getUserProfile: build.query({
            query: () => ({
                url: "user/profile",
                method: "GET",
            }),
        }),
        getAllUsers: build.query({
            query: () => ({
                url: "user/getAll",
                method: "GET",
            }),
        }),

        updateUser : build.mutation({
            query: (data) => ({
                url: `user/update`,
                method: "PUT",
                body: data
            }),
        }),
        changePassword : build.mutation({
            query: (data) => ({
                url: `user/changePassword`,
                method: "PUT",
                body: data
            }),
        }),
    }),
})

export const { useLoginMutation, 
    useRegisterMutation,
     useGetUserProfileQuery,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useChangePasswordMutation
    } = authorization