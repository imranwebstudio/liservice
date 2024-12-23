
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
            providesTags: ["User", "balance"],
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
        forgotPassword: build.mutation({
            query: (data) => ({
                url: `user/forgotPassword`,
                method: "POST",
                body: data
            }),
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: `user/resetPassword/${data.token}`,
                method: "POST",
                body: {password: data.password}
            }),
        }),
    }),
})

export const { useLoginMutation, 
    useRegisterMutation,
     useGetUserProfileQuery,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    } = authorization