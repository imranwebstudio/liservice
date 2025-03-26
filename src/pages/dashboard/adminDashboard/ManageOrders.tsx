/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../../utils/Container";
import { useApproveServiceMutation, useGetPendingServicesQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ManageOrders = () => {
    // Fetching pending services data
    const { data, isLoading } = useGetPendingServicesQuery(undefined);
    const [updateServiceStatus, { isLoading: isUpdating }] = useApproveServiceMutation();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter data based on search query
    const filteredData = data?.data?.filter((service: any) =>
        service?.userId?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service?.serviceId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service?.link?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle service status update
    const handleStatusUpdate = async (serviceId: string, status: string) => {
        Swal.fire({
            title: 'processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const response = await updateServiceStatus({ id: serviceId, status }).unwrap();
            console.log("Update success", response);
            Swal.fire("Success", "Service status updated successfully", "success");
        } catch (error) {
            console.error("Failed to update service status:", error);
            Swal.fire("Error", "Failed to update service status", "error");
        }
    };

    // Show loading state while fetching data
    if (isLoading) return <Loading />;

    // Render the orders management table
    return (
        <Container>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manage Promotion Orders</h2>
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    {filteredData?.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">No orders found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <TableHeader />
                                <TableBody data={filteredData} onStatusUpdate={handleStatusUpdate} isUpdating={isUpdating} />
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

// Component for table header
const TableHeader = () => (
    <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
    </thead>
);

// Component for table body
const TableBody = ({ data, onStatusUpdate, isUpdating }: { data: any[]; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <tbody className="bg-white divide-y divide-gray-200">
        {data?.map((service, index) => (
            <TableRow key={service._id} service={service} index={index} onStatusUpdate={onStatusUpdate} isUpdating={isUpdating} />
        ))}
    </tbody>
);

// Component for each row in the table
const TableRow = ({ service, index, onStatusUpdate, isUpdating }: { service: any; index: number; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service?.userId?.userName}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service?.serviceId?.name}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
            <a href={service?.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 truncate max-w-xs block">
                {service?.link}
            </a>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service?.quantity}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${service?.price}</td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                service?.status === "done" ? "bg-green-100 text-green-800" :
                service?.status === "rejected" ? "bg-red-100 text-red-800" :
                "bg-yellow-100 text-yellow-800"
            }`}>
                {service?.status}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <ActionButtons status={service?.status} serviceId={service?._id} onStatusUpdate={onStatusUpdate} isUpdating={isUpdating} />
        </td>
    </tr>
);

// Component for action buttons
const ActionButtons = ({ status, serviceId, onStatusUpdate, isUpdating }: { status: string; serviceId: string; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <>
        <button
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onStatusUpdate(serviceId, "done")}
            disabled={isUpdating || status === "done"}
        >
            Approve
        </button>
        <button
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onStatusUpdate(serviceId, "rejected")}
            disabled={isUpdating || status === "done"}
        >
            Reject
        </button>
    </>
);

export default ManageOrders;
