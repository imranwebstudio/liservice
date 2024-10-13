import  { useState } from "react";

const OrderHistory = () => {
    // Mock order data
    const [orders] = useState([
        {
            id: 1,
            service: "Facebook Post Boost",
            amount: "$50",
            status: "Completed",
            date: "2023-09-15",
        },
        {
            id: 2,
            service: "YouTube Channel Boost",
            amount: "$120",
            status: "Processing",
            date: "2023-09-18",
        },
        {
            id: 3,
            service: "Instagram Likes Enhancement",
            amount: "$75",
            status: "Completed",
            date: "2023-09-20",
        },
        {
            id: 4,
            service: "Twitter Followers Boost",
            amount: "$90",
            status: "Failed",
            date: "2023-09-22",
        },
    ]);

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
                        {orders.map((order, index) => (
                            <tr key={order.id} className={order.status === "Failed" ? "bg-red-100" : ""}>
                                <th>{index + 1}</th>
                                <td>{order.service}</td>
                                <td>{order.amount}</td>
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
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
