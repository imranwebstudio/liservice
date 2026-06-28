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
            query: ({ category = '', search = '', page = 1, limit = 20 }) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (category) params.set('category', category);
                if (search)   params.set('search',   search);
                return { url: `/service/getAll?${params.toString()}`, method: 'GET' };
            },
            providesTags: ["services"],
        }),

        buyService: build.mutation({
            query: (data) => {
                console.log("Buying service:", data); // Log the service ID
                return {
                    url: `/service/buy/${data.id}`,
                    method: "POST",
                    body: { quantity: data.buyInfo.quantity, link: data.buyInfo.link, price: data.buyInfo.price }
                };
            }
        }),

        getPendingServices: build.query({
            query: ({ search = '', page = 1, limit = 20, status = '' } ) => {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                if (search) params.set('search', search);
                if (status) params.set('status', status);
                return { url: `/service/getAllOrders?${params.toString()}`, method: "GET" };
            },
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

        getAllServices: build.query({
            query: ({ page = 1, limit = 20 }: { page?: number; limit?: number } = {}) => ({
                url: `/service/getAll?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['services'],
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
    useUpdateServiceMutation,
    useGetAllServicesQuery,
} = serviceApi;