/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useGetBalanceByUserIdQuery } from "../../../redux/features/balance/balance.api";
import Loading from "../../../utils/Loading";
import "../dashboard.css";

const getStatusBadge = (status: string) => {
    if (status === "approved") return "d-badge d-badge-green";
    if (status === "pending") return "d-badge d-badge-amber";
    return "d-badge d-badge-red";
};

const RechargeHistory = () => {
    const { data, isLoading } = useGetBalanceByUserIdQuery(undefined);

    if (isLoading) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-page-header">
                <h1 className="d-page-title">Recharge History</h1>
                <p className="d-page-sub">All your balance top-up requests.</p>
            </div>

            {/* Desktop table */}
            <div className="d-table-wrap rh-table-wrap" style={{ display: 'none' }}>
                <table className="d-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Paid Taka</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.balanceRequest?.map((recharge: any, index: any) => (
                            <tr key={recharge._id}>
                                <td className="d-td-primary">{index + 1}</td>
                                <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#aebcb2' }}>{recharge.reference}</td>
                                <td style={{ color: '#fbbf24', fontWeight: 600 }}>৳{recharge.paidTaka}</td>
                                <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${recharge.amount}</td>
                                <td>
                                    <span className={getStatusBadge(recharge.status)}>
                                        {recharge.status}
                                    </span>
                                </td>
                                <td style={{ color: '#74877b', fontSize: 12 }}>
                                    {moment(recharge.createdAt).format("MMM Do YYYY, h:mm a")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile card view */}
            <div className="rh-cards">
                {data?.data?.balanceRequest?.map((recharge: any, index: any) => (
                    <div key={recharge._id} className="d-mobile-card">
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">#{index + 1} Tx ID</span>
                            <span className="d-mobile-card-value" style={{ fontFamily: 'monospace', fontSize: 11 }}>
                                {recharge.reference}
                            </span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Paid</span>
                            <span style={{ color: '#fbbf24', fontWeight: 600, fontSize: 14 }}>৳{recharge.paidTaka}</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Amount</span>
                            <span style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 14 }}>${recharge.amount}</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Status</span>
                            <span className={getStatusBadge(recharge.status)}>{recharge.status}</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Date</span>
                            <span className="d-mobile-card-value" style={{ fontSize: 12 }}>
                                {moment(recharge.createdAt).format("MMM Do YYYY, h:mm a")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {(!data?.data?.balanceRequest || data.data.balanceRequest.length === 0) && (
                <div className="d-empty">
                    <h3>No recharge history</h3>
                    <p>Your balance top-up requests will appear here.</p>
                </div>
            )}

            <style>{`
                .rh-table-wrap { display: none; }
                .rh-cards { display: block; }
                @media (min-width: 641px) {
                    .rh-table-wrap { display: block; }
                    .rh-cards { display: none; }
                }
            `}</style>
        </div>
    );
};

export default RechargeHistory;
