/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useApproveBalanceRequestMutation, useGetBalanceRequestQuery } from "../../../redux/features/balance/balance.api";
import Loading from "../../../utils/Loading";
import moment from "moment";
import Swal from "sweetalert2";
import "../dashboard.css";

const getStatusBadge = (status: string) => {
    if (status === "approved") return "d-badge d-badge-green";
    if (status === "pending") return "d-badge d-badge-amber";
    return "d-badge d-badge-red";
};

const ManageRecharges = () => {
    const { data, isLoading } = useGetBalanceRequestQuery(undefined);
    const [approveRecharge] = useApproveBalanceRequestMutation();

    const handleApproveRecharge = async (id: string, status: string) => {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            await approveRecharge({ id, status }).unwrap();
            Swal.fire("Success", "Recharge request updated successfully", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update recharge request", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-page-header">
                <h1 className="d-page-title">Manage Customer Recharges</h1>
                <p className="d-page-sub">Review and approve balance top-up requests.</p>
            </div>

            {data?.data?.balanceRequests?.length === 0 ? (
                <div className="d-empty">
                    <h3>No recharge requests</h3>
                    <p>There are currently no pending recharge requests.</p>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="mr-table-wrap d-table-wrap" style={{ display: 'none' }}>
                        <table className="d-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Paid Taka</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Method</th>
                                    <th>Transaction ID</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data?.balanceRequests?.map((recharge: any, index: any) => (
                                    <tr key={recharge?._id || index}>
                                        <td>{index + 1}</td>
                                        <td className="d-td-primary">{recharge?.userId?.name}</td>
                                        <td>{recharge?.userId?.phone}</td>
                                        <td style={{ color: '#fbbf24', fontWeight: 600 }}>৳{recharge?.paidTaka}</td>
                                        <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${recharge?.amount}</td>
                                        <td style={{ color: '#74877b', fontSize: 12 }}>
                                            {moment(recharge?.createdAt).format("MMM Do YYYY, h:mm a")}
                                        </td>
                                        <td>{recharge?.paymentMethod}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{recharge?.reference}</td>
                                        <td>
                                            <span className={getStatusBadge(recharge?.status)}>
                                                {recharge?.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button
                                                    disabled={recharge?.status === "approved" || recharge?.status === "rejected"}
                                                    className="d-btn d-btn-primary d-btn-sm"
                                                    onClick={() => handleApproveRecharge(recharge?._id, "approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="d-btn d-btn-danger d-btn-sm"
                                                    onClick={() => handleApproveRecharge(recharge?._id, "rejected")}
                                                    disabled={recharge?.status === "rejected" || recharge?.status === "approved"}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="mr-cards">
                        {data?.data?.balanceRequests?.map((recharge: any, index: any) => (
                            <div key={recharge?._id || index} className="d-mobile-card">
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">#{index + 1} Name</span>
                                    <span className="d-mobile-card-value" style={{ color: '#e8f5ec' }}>{recharge?.userId?.name}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Phone</span>
                                    <span className="d-mobile-card-value">{recharge?.userId?.phone}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Paid / Amount</span>
                                    <span style={{ fontSize: 14 }}>
                                        <span style={{ color: '#fbbf24', fontWeight: 600 }}>৳{recharge?.paidTaka}</span>
                                        <span style={{ color: '#4d6455', margin: '0 4px' }}>/</span>
                                        <span style={{ color: '#1fbf6c', fontWeight: 600 }}>${recharge?.amount}</span>
                                    </span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Method</span>
                                    <span className="d-mobile-card-value">{recharge?.paymentMethod}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Tx ID</span>
                                    <span className="d-mobile-card-value" style={{ fontFamily: 'monospace', fontSize: 11 }}>{recharge?.reference}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Status</span>
                                    <span className={getStatusBadge(recharge?.status)}>{recharge?.status}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                    <button
                                        disabled={recharge?.status === "approved" || recharge?.status === "rejected"}
                                        className="d-btn d-btn-primary d-btn-sm"
                                        onClick={() => handleApproveRecharge(recharge?._id, "approved")}
                                        style={{ flex: 1 }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="d-btn d-btn-danger d-btn-sm"
                                        onClick={() => handleApproveRecharge(recharge?._id, "rejected")}
                                        disabled={recharge?.status === "rejected" || recharge?.status === "approved"}
                                        style={{ flex: 1 }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <style>{`
                .mr-table-wrap { display: none; }
                .mr-cards { display: block; }
                @media (min-width: 900px) {
                    .mr-table-wrap { display: block; }
                    .mr-cards { display: none; }
                }
            `}</style>
        </div>
    );
};

export default ManageRecharges;
