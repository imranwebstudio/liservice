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
            query: ({ category }) => ({
                url: `/service/getAll?category=${category}`,
                method: "GET"
            }),

            providesTags: ["services"],
        }),

        buyService: build.mutation({
            query: (data) => {
                console.log("Buying service with ID:", data.id); // Log the service ID
                return {
                    url: `/service/buy/${data.id}`,
                    method: "POST",
                    body: { quantity: data.buyInfo.quantity, link: data.buyInfo.link }
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
                body: { status: args.status }
            }),

            invalidatesTags: ["services"],
        }),

        getPendingServiceByUserId: build.query({
            query: () => ({
                url: "/service/getServiceByUserId",
                method: "GET"
            })
        }),

        updateService: build.mutation({
            query: (data) => {
                console.log("inside update mutation",data);
                return {
                    url: `/service/update/${data.id}`,
                    method: "PUT",
                    body: data.service
                }
            },

            invalidatesTags: ["services"],
        }),

        deleteService: build.mutation({
            query: (id) => ({
                url: `/service/delete/${id}`,
                method: "DELETE"
            }),

            invalidatesTags: ["services"],
        }),

    })
})

export const {
    useCreateServiceMutation,
    useGetServicesQuery,
    useBuyServiceMutation,
    useGetPendingServicesQuery,
    useApproveServiceMutation,
    useGetPendingServiceByUserIdQuery,
    useDeleteServiceMutation,
    useUpdateServiceMutation
} = serviceApi;