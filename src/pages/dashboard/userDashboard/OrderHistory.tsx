/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useGetPendingServiceByUserIdQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";
import "../dashboard.css";

const getStatusBadge = (status: string) => {
    if (status === "Completed" || status === "done") return "d-badge d-badge-green";
    if (status === "Processing") return "d-badge d-badge-amber";
    return "d-badge d-badge-red";
};

const OrderHistory = () => {
    const { data, isLoading } = useGetPendingServiceByUserIdQuery(undefined);

    if (isLoading) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-page-header">
                <h1 className="d-page-title">Order History</h1>
                <p className="d-page-sub">All your past and current orders.</p>
            </div>

            {/* Desktop table */}
            <div className="d-table-wrap" style={{ display: 'none' as any }}>
                <style>{`@media(min-width:641px){.oh-table-wrap{display:block!important}.oh-cards{display:none!important}}`}</style>
            </div>

            <div className="d-table-wrap oh-table-wrap" style={{ display: 'none' }}>
                <table className="d-table">
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
                            <tr key={order._id || index}>
                                <td className="d-td-primary">{index + 1}</td>
                                <td className="d-td-primary">{order?.serviceId?.name}</td>
                                <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${order.price}</td>
                                <td>
                                    <span className={getStatusBadge(order.status)}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ color: '#74877b', fontSize: 12 }}>
                                    {moment(order.createdAt).format("MMM Do YYYY, h:mm a")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile card view */}
            <div className="oh-cards">
                {data?.data?.map((order: any, index: number) => (
                    <div key={order._id || index} className="d-mobile-card">
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">#{index + 1} Service</span>
                            <span className="d-mobile-card-value" style={{ color: '#e8f5ec', fontWeight: 500 }}>
                                {order?.serviceId?.name}
                            </span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Amount</span>
                            <span style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 14 }}>${order.price}</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Status</span>
                            <span className={getStatusBadge(order.status)}>{order.status}</span>
                        </div>
                        <div className="d-mobile-card-row">
                            <span className="d-mobile-card-label">Date</span>
                            <span className="d-mobile-card-value" style={{ fontSize: 12 }}>
                                {moment(order.createdAt).format("MMM Do YYYY, h:mm a")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {(!data?.data || data.data.length === 0) && (
                <div className="d-empty">
                    <h3>No orders yet</h3>
                    <p>Your order history will appear here.</p>
                </div>
            )}

            <style>{`
                .oh-table-wrap { display: none; }
                .oh-cards { display: block; }
                @media (min-width: 641px) {
                    .oh-table-wrap { display: block; }
                    .oh-cards { display: none; }
                }
            `}</style>
        </div>
    );
};

export default OrderHistory;
