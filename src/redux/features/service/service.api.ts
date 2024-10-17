import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createService: build.mutation({
            query: (data) => ({
                url: "/service/create",
                method: "POST",
                body: data
            })
        }),
        getServices: build.query({
            query: ({category}) => ({
                url: `/service/getAll?category=${category}`,
                method: "GET"
            })
        }),

        buyService: build.mutation({
            query: (id) => {
                console.log("Buying service with ID:", id); // Log the service ID
                return {
                    url: `/service/buy/${id}`,
                    method: "POST",
                };
            }
        }),

        getPendingServices: build.query({
            query: () => ({
                url: "/service/getAllOrders",
                method: "GET"
            }),

            providesTags: ["services"],
        }),

        approveService: build.mutation({
            query: (args) => ({
                url: `/service/approve/${args.id}`,
                method: "PUT",
                body: {status: args.status}
            }),

            invalidatesTags: ["services"],
        }),

    })
})

export const { useCreateServiceMutation, useGetServicesQuery, useBuyServiceMutation, useGetPendingServicesQuery, useApproveServiceMutation } = serviceApi;