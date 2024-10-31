/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../../utils/Container";
import { useApproveServiceMutation, useGetPendingServicesQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";

const ManageOrders = () => {
    // Fetching pending services data
    const { data, isLoading } = useGetPendingServicesQuery(undefined);
    const [updateServiceStatus, { isLoading: isUpdating }] = useApproveServiceMutation();

    // Function to handle service status update
    const handleStatusUpdate = async (serviceId: string, status: string) => {
        console.log("Button clicked", serviceId, status); // Debug log
        try {
            const response = await updateServiceStatus({ id: serviceId, status }).unwrap();
            console.log("Update success", response); // Debug log
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
            {
                data?.data.length === 0 ? (
                    <p className="text-center text-gray-600">No orders found</p>
                ) :
                    <>
                        <h2 className="text-xl font-bold mb-4 mx-auto text-center">Manage Promotion Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <TableHeader />
                                <TableBody data={data?.data} onStatusUpdate={handleStatusUpdate} isUpdating={isUpdating} />
                            </table>
                        </div>
                    </>
            }

        </Container>

    );
};

// Component for table header
const TableHeader = () => (
    <thead>
        <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Link</th>
            <th>amount</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
);

// Component for table body
const TableBody = ({ data, onStatusUpdate, isUpdating }: { data: any[]; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <tbody>
        {data?.map((service, index) => (
            <TableRow key={service._id} service={service} index={index} onStatusUpdate={onStatusUpdate} isUpdating={isUpdating} />
        ))}
    </tbody>
);

// Component for each row in the table
const TableRow = ({ service, index, onStatusUpdate, isUpdating }: { service: any; index: number; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <tr>
        <th>{index + 1}</th>
        <td>{service.userId.userName}</td>
        <td>{service?.serviceId?.name}</td>
        <td>{service?.link}</td>
        <td>{service?.quantity}</td>
        <td>{service?.price}</td>
        <td>{service?.status}</td>
        <td>
            <ActionButtons status={service.status} serviceId={service._id} onStatusUpdate={onStatusUpdate} isUpdating={isUpdating} />
        </td>
    </tr>
);

// Component for action buttons
const ActionButtons = ({ status, serviceId, onStatusUpdate, isUpdating }: { status: string; serviceId: string; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <>
        <button
            className="btn btn-success btn-xs mr-2"
            onClick={() => onStatusUpdate(serviceId, "done")}
            disabled={isUpdating || status === "done"}
        >
            Approve
        </button>
        <button
            className="btn btn-danger btn-xs"
            onClick={() => onStatusUpdate(serviceId, "rejected")}
            disabled={isUpdating || status === "done"}
        >
            Reject
        </button>
    </>
);






export default ManageOrders;
