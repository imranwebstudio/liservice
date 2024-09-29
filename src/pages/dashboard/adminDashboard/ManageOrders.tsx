import  { useState } from "react";
import Container from "../../../utils/Container";

// Mock Order Data for Social Media Promotion Services
const mockOrders = [
    { id: 1, customer: "John Doe", service: "Facebook Post Boost", platform: "Facebook", quantity: "5k", cost: "$50", status: "Pending" },
    { id: 2, customer: "Jane Smith", service: "YouTube Channel Boost", platform: "YouTube", quantity: "10k Views", cost: "$100", status: "Approved" },
    { id: 3, customer: "Michael Johnson", service: "Instagram Likes Enhancement", platform: "Instagram", quantity: "2k Likes", cost: "$40", status: "Pending" },
    { id: 4, customer: "Emily Davis", service: "Twitter Follower Growth", platform: "Twitter", quantity: "1k Followers", cost: "$30", status: "Shipped" },
    { id: 5, customer: "Chris Lee", service: "TikTok Engagement Boost", platform: "TikTok", quantity: "3k Views", cost: "$60", status: "Pending" },
];

const ManageOrders = () => {
    // State to manage the orders
    const [orders, setOrders] = useState(mockOrders);

    // Function to handle approval of an order
    const handleApprove = (orderId: number) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: "Approved" } : order
        );
        setOrders(updatedOrders);
    };

    // Function to handle cancellation of an order
    const handleCancel = (orderId: number) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: "Cancelled" } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <Container>
            <div>
                <h2 className="text-xl font-bold mb-4">Manage Promotion Orders</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Service</th>
                                <th>Platform</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id}>
                                    <th>{index + 1}</th>
                                    <td>{order.customer}</td>
                                    <td>{order.service}</td>
                                    <td>{order.platform}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.cost}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {/* Buttons to approve or cancel */}
                                        <button
                                            className="btn btn-sm btn-success mr-2"
                                            onClick={() => handleApprove(order.id)}
                                            disabled={order.status === "Approved" || order.status === "Shipped"}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleCancel(order.id)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
};

export default ManageOrders;
