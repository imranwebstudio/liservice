/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { useGetPendingServiceByUserIdQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";

const OrderHistory = () => {
    const { data, isLoading } = useGetPendingServiceByUserIdQuery(undefined);
    
    console.log(data);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((order: any, index: number) => (
                            <tr key={order.id} className={order.status === "Failed" ? "bg-red-100" : ""}>
                                <th>{index + 1}</th>
                                <td>{order.serviceId}</td>
                                <td>${order.price}</td>
                                <td>
                                    <span
                                        className={`${
                                            order.status === "Completed"
                                                ? "text-green-600"
                                                : order.status === "Processing"
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                        } font-semibold`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>{moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
