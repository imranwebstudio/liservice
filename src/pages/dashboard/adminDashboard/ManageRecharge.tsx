/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from "../../../utils/Container";
import { useApproveBalanceRequestMutation, useGetBalanceRequestQuery } from "../../../redux/features/balance/balance.api";
import Loading from "../../../utils/Loading";
import moment from "moment";
import Swal from "sweetalert2";

// Mock Recharge Data


const ManageRecharges = () => {
    const { data, isLoading } = useGetBalanceRequestQuery(undefined);
    const [approveRecharge] = useApproveBalanceRequestMutation();

    const handleApproveRecharge = async (id: string, status: string) => {
        Swal.fire({
            title: 'processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await approveRecharge({ id, status }).unwrap();
            Swal.fire("Success", "Recharge request approved successfully", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to approve recharge request", "error");
        }
    };

    if (isLoading) return <Loading />

    return (
        <Container>
            <div>
                <h2 className="text-xl font-bold mb-4">Manage Customer Recharges</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Amount </th>
                                <th>Paid Taka</th>
                                <th>Recharge Date</th>
                                <th>Method</th>
                                <th>TransactionId</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.balanceRequests?.map((recharge: any, index: any) => (
                                <tr key={recharge.id}>
                                    <th>{index + 1}</th>
                                    <td>{recharge.userId.name}</td>
                                    <td>{recharge.userId.phone}</td>
                                    <td>{recharge.paidTaka}</td>
                                    <td>${recharge.amount}</td>
                                    <td>{moment(recharge.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                    <td>{recharge.paymentMethod}</td>
                                    <td>{recharge.reference}</td>
                                    <td>
                                        <span
                                            className={`${recharge.status === "approved"
                                                ? "text-green-600"
                                                : recharge.status === "pending"
                                                    ? "text-yellow-500"
                                                    : "text-red-500"
                                                } font-semibold`}
                                        >
                                            {recharge.status}
                                        </span>
                                    </td>
                                    <td className="flex gap-6">
                                        {/* Button to Refund Recharge */}
                                        <button
                                            disabled={recharge.status === "approved"}
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleApproveRecharge(recharge._id, "approved")}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => handleApproveRecharge(recharge._id, "rejected")}
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

export default ManageRecharges;
