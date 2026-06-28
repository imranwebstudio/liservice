/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApproveServiceMutation, useGetPendingServicesQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../dashboard.css";

const PAGE_SIZE = 20;

function getPageNumbers(current: number, total: number): (number | '…')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
    if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '…', current - 1, current, current + 1, '…', total];
}

const getStatusBadge = (status: string) => {
    if (status === "done" || status === "approved" || status === "Completed") return "d-badge d-badge-green";
    if (status === "rejected" || status === "Failed") return "d-badge d-badge-red";
    return "d-badge d-badge-amber";
};

const STATUS_OPTIONS = [
    { value: '',         label: 'All statuses' },
    { value: 'pending',  label: 'Pending' },
    { value: 'done',     label: 'Done' },
    { value: 'rejected', label: 'Rejected' },
];

const ManageOrders = () => {
    const [searchQuery, setSearchQuery]   = useState('');
    const [debouncedSearch, setDebounced] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage]   = useState(1);

    const [updateServiceStatus, { isLoading: isUpdating }] = useApproveServiceMutation();

    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchQuery.trim()), 350);
        return () => clearTimeout(t);
    }, [searchQuery]);

    useEffect(() => { setCurrentPage(1); }, [debouncedSearch, statusFilter]);

    const { data, isLoading, isFetching } = useGetPendingServicesQuery({
        search: debouncedSearch,
        page:   currentPage,
        limit:  PAGE_SIZE,
        status: statusFilter,
    });

    const orders: any[] = data?.data?.orders     ?? [];
    const total         = data?.data?.total       ?? 0;
    const totalPages    = data?.data?.totalPages  ?? 1;

    const handleStatusUpdate = async (serviceId: string, status: string) => {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            await updateServiceStatus({ id: serviceId, status }).unwrap();
            Swal.fire("Success", "Order status updated successfully", "success");
        } catch {
            Swal.fire("Error", "Failed to update order status", "error");
        }
    };

    if (isLoading) return <Loading />;

    const pageNums = getPageNumbers(currentPage, totalPages);

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-card">
                {/* Header */}
                <div className="d-card-header">
                    <div>
                        <h2 className="d-card-title">Manage Promotion Orders</h2>
                        <p className="d-card-sub">{total} order{total !== 1 ? 's' : ''} found</p>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <select
                            className="d-select"
                            style={{ width: 150, height: 38, padding: '0 12px' }}
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                        >
                            {STATUS_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        <div className="d-search-wrap" style={{ width: 220 }}>
                            <span className="d-search-icon"><FaSearch size={13} /></span>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="d-search-input"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div style={{ opacity: isFetching ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                    {orders.length === 0 ? (
                        <div className="d-empty">
                            <h3>No orders found</h3>
                            <p>Try adjusting your search or filter.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="mo-table-wrap d-table-wrap">
                                <table className="d-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Customer</th>
                                            <th>Service</th>
                                            <th>Link</th>
                                            <th>Qty</th>
                                            <th>Cost</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order: any, index: number) => (
                                            <tr key={order._id}>
                                                <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                                                <td className="d-td-primary">{order?.userId?.userName}</td>
                                                <td className="d-td-primary">{order?.serviceId?.name}</td>
                                                <td style={{ maxWidth: 180 }}>
                                                    <a href={order?.link} target="_blank" rel="noopener noreferrer"
                                                        className="d-link"
                                                        style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                                                        {order?.link}
                                                    </a>
                                                </td>
                                                <td>{order?.quantity}</td>
                                                <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${order?.price}</td>
                                                <td>
                                                    <span className={getStatusBadge(order?.status)}>{order?.status}</span>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <ActionButtons
                                                            status={order?.status}
                                                            serviceId={order?._id}
                                                            onStatusUpdate={handleStatusUpdate}
                                                            isUpdating={isUpdating}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <div className="mo-cards" style={{ padding: 16 }}>
                                {orders.map((order: any, index: number) => (
                                    <div key={order._id} className="d-mobile-card">
                                        <div className="d-mobile-card-row">
                                            <span className="d-mobile-card-label">#{(currentPage - 1) * PAGE_SIZE + index + 1} Customer</span>
                                            <span className="d-mobile-card-value" style={{ color: '#e8f5ec' }}>{order?.userId?.userName}</span>
                                        </div>
                                        <div className="d-mobile-card-row">
                                            <span className="d-mobile-card-label">Service</span>
                                            <span className="d-mobile-card-value">{order?.serviceId?.name}</span>
                                        </div>
                                        <div className="d-mobile-card-row">
                                            <span className="d-mobile-card-label">Cost</span>
                                            <span style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 14 }}>${order?.price}</span>
                                        </div>
                                        <div className="d-mobile-card-row">
                                            <span className="d-mobile-card-label">Status</span>
                                            <span className={getStatusBadge(order?.status)}>{order?.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                            <ActionButtons
                                                status={order?.status}
                                                serviceId={order?._id}
                                                onStatusUpdate={handleStatusUpdate}
                                                isUpdating={isUpdating}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-1.5 py-4 flex-wrap">
                                    <button
                                        className="d-btn d-btn-ghost d-btn-sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                    >← Prev</button>
                                    {pageNums.map((n, i) =>
                                        n === '…'
                                            ? <span key={`e${i}`} className="px-2 text-(--db-t2)">…</span>
                                            : <button key={n}
                                                className="d-btn d-btn-sm"
                                                style={currentPage === n
                                                    ? { background: '#1fbf6c', color: '#fff', border: 'none' }
                                                    : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#aebcb2' }}
                                                onClick={() => setCurrentPage(n as number)}
                                            >{n}</button>
                                    )}
                                    <button
                                        className="d-btn d-btn-ghost d-btn-sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                    >Next →</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <style>{`
                .mo-table-wrap { display: none; }
                .mo-cards { display: block; }
                @media (min-width: 768px) {
                    .mo-table-wrap { display: block !important; }
                    .mo-cards { display: none !important; }
                }
            `}</style>
        </div>
    );
};

const ActionButtons = ({ status, serviceId, onStatusUpdate, isUpdating }: {
    status: string;
    serviceId: string;
    onStatusUpdate: (id: string, status: string) => void;
    isUpdating: boolean;
}) => (
    <>
        <button
            className="d-btn d-btn-primary d-btn-sm"
            onClick={() => onStatusUpdate(serviceId, "done")}
            disabled={isUpdating || status === "done"}
        >Approve</button>
        <button
            className="d-btn d-btn-danger d-btn-sm"
            onClick={() => onStatusUpdate(serviceId, "rejected")}
            disabled={isUpdating || status === "done"}
        >Reject</button>
    </>
);

export { ActionButtons };
export default ManageOrders;
