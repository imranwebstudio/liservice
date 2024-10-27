/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../../utils/Container";
import { useApproveServiceMutation, useGetPendingServicesQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";



const ManageOrders = () => {

    const { data, isLoading } = useGetPendingServicesQuery(undefined, {pollingInterval: 10000});
    const [updateServiceStatus, { isLoading: isUpdating }] = useApproveServiceMutation();


    console.log(data);

    if (isLoading) return <Loading />;

    const handleStatusUpdate = async (serviceId: string, status: string) => {
        try {
            await updateServiceStatus({ id: serviceId, status }).unwrap();
            alert(`Service updated to ${status}`);
        } catch (error) {
            console.error("Failed to update service status:", error);
        }
    };

    // Function to handle approval of an order
  

    return (
        <Container>
            <div>
                <h2 className="text-xl font-bold mb-4 mx-auto text-center">Manage Promotion Orders</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Service</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((service: any, index: any) => (
                                <tr key={service.id}>
                                    <th>{index + 1}</th>
                                    <td>{service.userId.userName}</td>
                                    <td>{service?.serviceId?.name}</td>
                                    <td>{service?.serviceId?.price}</td>
                                    <td>{service.status}</td>
                                    <td>
                                    <button
                                            className="btn btn-success btn-xs mr-2"
                                            onClick={() => handleStatusUpdate(service._id, "done")}
                                            disabled={isUpdating || service.status !== "pending"}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger btn-xs"
                                            onClick={() => handleStatusUpdate(service._id, "rejected")}
                                            disabled={isUpdating || service.status === "approved"}
                                        >
                                            Reject
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
