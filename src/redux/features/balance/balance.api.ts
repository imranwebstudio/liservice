import { baseApi } from "../../api/baseApi";

const balanceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBalanceRequest: build.query({
            query: () => ({
                url: "/balance/getAll",
                method: "GET",
            }),
            providesTags: ["balance"],
        }),

        getBalanceByUserId: build.query({
            query: () => ({
                url: `/balance/getByUserId`,
                method: "GET",
            }),
            providesTags: ["balance"],
        }),

        addBalance: build.mutation({
            query: (data) => ({
                url: "/balance/addBalance",
                method: "POST",
                body: data,
            }),

            invalidatesTags: ["balance"],
        }),

        approveBalanceRequest: build.mutation({
            query: (data) => ({
                url: `/balance/update/${data.id}`,
                method: "PUT",
                body: data,
            }),

            invalidatesTags: ["balance"],
        })
    }),
})

export const {
    useGetBalanceRequestQuery,
    useAddBalanceMutation,
    useGetBalanceByUserIdQuery,
    useApproveBalanceRequestMutation
} = balanceApi;
