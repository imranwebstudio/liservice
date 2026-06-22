/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApproveServiceMutation, useGetPendingServicesQuery } from "../../../redux/features/service/service.api";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../dashboard.css";

const getStatusBadge = (status: string) => {
    if (status === "done" || status === "approved" || status === "Completed") return "d-badge d-badge-green";
    if (status === "rejected" || status === "Failed") return "d-badge d-badge-red";
    return "d-badge d-badge-amber";
};

const ManageOrders = () => {
    const { data, isLoading } = useGetPendingServicesQuery(undefined);
    const [updateServiceStatus, { isLoading: isUpdating }] = useApproveServiceMutation();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = data?.data?.filter((service: any) =>
        service?.userId?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service?.serviceId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service?.link?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStatusUpdate = async (serviceId: string, status: string) => {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            await updateServiceStatus({ id: serviceId, status }).unwrap();
            Swal.fire("Success", "Service status updated successfully", "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update service status", "error");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            <div className="d-card">
                <div className="d-card-header">
                    <div>
                        <h2 className="d-card-title">Manage Promotion Orders</h2>
                        <p className="d-card-sub">{filteredData?.length ?? 0} orders found</p>
                    </div>
                    <div className="d-search-wrap" style={{ width: 260 }}>
                        <span className="d-search-icon"><FaSearch size={13} /></span>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="d-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {filteredData?.length === 0 ? (
                    <div className="d-empty">
                        <h3>No orders found</h3>
                        <p>Try adjusting your search query.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="mo-table-wrap d-table-wrap" style={{ borderRadius: 0, border: 'none', display: 'none' }}>
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
                                    {filteredData?.map((service: any, index: number) => (
                                        <tr key={service._id}>
                                            <td>{index + 1}</td>
                                            <td className="d-td-primary">{service?.userId?.userName}</td>
                                            <td className="d-td-primary">{service?.serviceId?.name}</td>
                                            <td style={{ maxWidth: 180 }}>
                                                <a
                                                    href={service?.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="d-link"
                                                    style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}
                                                >
                                                    {service?.link}
                                                </a>
                                            </td>
                                            <td>{service?.quantity}</td>
                                            <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${service?.price}</td>
                                            <td>
                                                <span className={getStatusBadge(service?.status)}>
                                                    {service?.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: 6 }}>
                                                    <ActionButtons
                                                        status={service?.status}
                                                        serviceId={service?._id}
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
                            {filteredData?.map((service: any, index: number) => (
                                <div key={service._id} className="d-mobile-card">
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">#{index + 1} Customer</span>
                                        <span className="d-mobile-card-value" style={{ color: '#e8f5ec' }}>{service?.userId?.userName}</span>
                                    </div>
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">Service</span>
                                        <span className="d-mobile-card-value">{service?.serviceId?.name}</span>
                                    </div>
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">Cost</span>
                                        <span style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 14 }}>${service?.price}</span>
                                    </div>
                                    <div className="d-mobile-card-row">
                                        <span className="d-mobile-card-label">Status</span>
                                        <span className={getStatusBadge(service?.status)}>{service?.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                        <ActionButtons
                                            status={service?.status}
                                            serviceId={service?._id}
                                            onStatusUpdate={handleStatusUpdate}
                                            isUpdating={isUpdating}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <style>{`
                .mo-table-wrap { display: none; }
                .mo-cards { display: block; }
                @media (min-width: 768px) {
                    .mo-table-wrap { display: block; }
                    .mo-cards { display: none; }
                }
            `}</style>
        </div>
    );
};

const TableHeader = () => (
    <thead>
        <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Link</th>
            <th>Amount</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
);

const TableBody = ({ data, onStatusUpdate, isUpdating }: { data: any[]; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <tbody>
        {data?.map((service, index) => (
            <TableRow key={service._id} service={service} index={index} onStatusUpdate={onStatusUpdate} isUpdating={isUpdating} />
        ))}
    </tbody>
);

const TableRow = ({ service, index, onStatusUpdate, isUpdating }: { service: any; index: number; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <tr>
        <td>{index + 1}</td>
        <td className="d-td-primary">{service?.userId?.userName}</td>
        <td className="d-td-primary">{service?.serviceId?.name}</td>
        <td>
            <a href={service?.link} target="_blank" rel="noopener noreferrer" className="d-link">
                {service?.link}
            </a>
        </td>
        <td>{service?.quantity}</td>
        <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${service?.price}</td>
        <td>
            <span className={getStatusBadge(service?.status)}>{service?.status}</span>
        </td>
        <td>
            <div style={{ display: 'flex', gap: 6 }}>
                <ActionButtons status={service?.status} serviceId={service?._id} onStatusUpdate={onStatusUpdate} isUpdating={isUpdating} />
            </div>
        </td>
    </tr>
);

const ActionButtons = ({ status, serviceId, onStatusUpdate, isUpdating }: { status: string; serviceId: string; onStatusUpdate: (id: string, status: string) => void; isUpdating: boolean }) => (
    <>
        <button
            className="d-btn d-btn-primary d-btn-sm"
            onClick={() => onStatusUpdate(serviceId, "done")}
            disabled={isUpdating || status === "done"}
        >
            Approve
        </button>
        <button
            className="d-btn d-btn-danger d-btn-sm"
            onClick={() => onStatusUpdate(serviceId, "rejected")}
            disabled={isUpdating || status === "done"}
        >
            Reject
        </button>
    </>
);

export { TableHeader, TableBody, TableRow, ActionButtons };
export default ManageOrders;
