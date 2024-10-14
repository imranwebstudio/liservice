import { baseApi } from "../../api/baseApi";

const balanceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBalance: build.query({
            query: () => ({
                url: "/balance/getAll",
                method: "GET",
            }),
        }),

        addBalance: build.mutation({
            query: (data) => ({
                url: "/balance/addBalance",
                method: "POST",
                body: data,
            }),
        }),
    }),
})

export const {
    useGetBalanceQuery,
    useAddBalanceMutation
} = balanceApi;
