import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPaymentMethods: build.query({
            query: () => ({ url: "/payment/methods", method: "GET" }),
            providesTags: ["payment"],
        }),
        getPaymentMethodsAdmin: build.query({
            query: () => ({ url: "/payment/methods/all", method: "GET" }),
            providesTags: ["payment"],
        }),
        getPaymentConfig: build.query({
            query: () => ({ url: "/payment/config", method: "GET" }),
            providesTags: ["payment"],
        }),
        createPaymentMethod: build.mutation({
            query: (data) => ({ url: "/payment/methods", method: "POST", body: data }),
            invalidatesTags: ["payment"],
        }),
        updatePaymentMethod: build.mutation({
            query: ({ id, ...data }) => ({ url: `/payment/methods/${id}`, method: "PUT", body: data }),
            invalidatesTags: ["payment"],
        }),
        deletePaymentMethod: build.mutation({
            query: (id) => ({ url: `/payment/methods/${id}`, method: "DELETE" }),
            invalidatesTags: ["payment"],
        }),
        updatePaymentConfig: build.mutation({
            query: (data) => ({ url: "/payment/config", method: "PUT", body: data }),
            invalidatesTags: ["payment"],
        }),
    }),
});

export const {
    useGetPaymentMethodsQuery,
    useGetPaymentMethodsAdminQuery,
    useGetPaymentConfigQuery,
    useCreatePaymentMethodMutation,
    useUpdatePaymentMethodMutation,
    useDeletePaymentMethodMutation,
    useUpdatePaymentConfigMutation,
} = paymentApi;
