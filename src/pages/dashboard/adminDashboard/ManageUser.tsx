import { useState } from "react";
import moment from "moment";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";
import { useGiveBalanceByAdminMutation } from "../../../redux/features/balance/balance.api";
import { FaSearch } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import "../dashboard.css";

interface User {
    _id: string;
    name: string;
    userName: string;
    email: string;
    balance: number;
    createdAt: string;
    isDeleted: boolean;
    isBlocked: boolean;
}

const ManageUser = () => {
    const { data, refetch, isLoading } = useGetAllUsersQuery(undefined);
    const [blockUser, { isLoading: isBlocking }] = useUpdateUserMutation();
    const [giveBalance] = useGiveBalanceByAdminMutation();
    const [givenBalanceAmount, setGivenBalanceAmount] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleBlockUser = async (user: User) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#149656",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, block it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Blocking...",
                    text: "Please wait while we process your request",
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); },
                });
                try {
                    await blockUser({ id: user?._id, ...user, isDeleted: true }).unwrap();
                    Swal.fire("Blocked!", "User has been blocked.", "success");
                    refetch();
                } catch (error) {
                    Swal.fire("Error", "Failed to block user.", "error");
                }
            }
        });
    };

    const handleRechargeClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleRechargeSubmit = async () => {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });
        const result = await giveBalance({ id: selectedUser?._id, amount: givenBalanceAmount }).unwrap();
        if (result.success) {
            Swal.fire("Success", "Balance added successfully", "success");
        } else {
            Swal.fire("Error", "Failed to add balance", "error");
        }
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const filteredUsers = data?.data?.filter((user: User) =>
        Object.keys(user).some((key) =>
            typeof user[key as keyof User] === 'string' &&
            (user[key as keyof User] as string).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (isLoading || isBlocking) return <Loading />;

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            {/* Header */}
            <div className="d-card" style={{ marginBottom: 16 }}>
                <div className="d-card-header">
                    <div>
                        <h1 className="d-card-title">Manage Users</h1>
                        <p className="d-card-sub">Manage and monitor your users here</p>
                    </div>
                    <div className="d-search-wrap" style={{ width: 260 }}>
                        <span className="d-search-icon"><FaSearch size={13} /></span>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="d-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredUsers?.length === 0 ? (
                <div className="d-empty">
                    <h3>No users found</h3>
                    <p>Try adjusting your search query.</p>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="mu-table-wrap d-table-wrap" style={{ display: 'none' }}>
                        <table className="d-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Balance</th>
                                    <th>Join Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers?.map((user: User, index: number) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td className="d-td-primary">{user.name}</td>
                                        <td>{user.userName}</td>
                                        <td style={{ color: '#74877b' }}>{user.email}</td>
                                        <td style={{ color: '#1fbf6c', fontWeight: 600 }}>${user.balance}</td>
                                        <td style={{ color: '#74877b', fontSize: 12 }}>
                                            {moment(user.createdAt).format("MMM Do YYYY, h:mm a")}
                                        </td>
                                        <td>
                                            {user.isDeleted
                                                ? <span className="d-badge d-badge-red">Blocked</span>
                                                : <span className="d-badge d-badge-green">Active</span>
                                            }
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button
                                                    className="d-btn d-btn-primary d-btn-sm"
                                                    onClick={() => handleRechargeClick(user)}
                                                >
                                                    Recharge
                                                </button>
                                                <button
                                                    className={`d-btn d-btn-sm ${user.isDeleted ? 'd-btn-ghost' : 'd-btn-amber'}`}
                                                    onClick={() => handleBlockUser(user)}
                                                >
                                                    {user.isDeleted ? "Unblock" : "Block"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="mu-cards">
                        {filteredUsers?.map((user: User, index: number) => (
                            <div key={user._id} className="d-mobile-card">
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">#{index + 1} Name</span>
                                    <span className="d-mobile-card-value" style={{ color: '#e8f5ec' }}>{user.name}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Username</span>
                                    <span className="d-mobile-card-value">{user.userName}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Email</span>
                                    <span className="d-mobile-card-value" style={{ fontSize: 12 }}>{user.email}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Balance</span>
                                    <span style={{ color: '#1fbf6c', fontWeight: 600, fontSize: 14 }}>${user.balance}</span>
                                </div>
                                <div className="d-mobile-card-row">
                                    <span className="d-mobile-card-label">Status</span>
                                    {user.isDeleted
                                        ? <span className="d-badge d-badge-red">Blocked</span>
                                        : <span className="d-badge d-badge-green">Active</span>
                                    }
                                </div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                    <button
                                        className="d-btn d-btn-primary d-btn-sm"
                                        style={{ flex: 1 }}
                                        onClick={() => handleRechargeClick(user)}
                                    >
                                        Recharge
                                    </button>
                                    <button
                                        className={`d-btn d-btn-sm ${user.isDeleted ? 'd-btn-ghost' : 'd-btn-amber'}`}
                                        style={{ flex: 1 }}
                                        onClick={() => handleBlockUser(user)}
                                    >
                                        {user.isDeleted ? "Unblock" : "Block"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Recharge Modal */}
            {isModalOpen && (
                <div className="d-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}>
                    <div className="d-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="d-modal-header">
                            <h3 className="d-modal-title">Give Balance to {selectedUser?.name}</h3>
                            <button className="d-modal-close" onClick={handleCloseModal}>
                                <CgClose />
                            </button>
                        </div>
                        <div className="d-modal-body">
                            <div className="d-form-field">
                                <label className="d-label">Amount (USD)</label>
                                <input
                                    type="number"
                                    className="d-input"
                                    placeholder="Enter amount"
                                    onChange={(e) => setGivenBalanceAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="d-modal-footer">
                            <button className="d-btn d-btn-ghost" onClick={handleCloseModal}>Close</button>
                            <button className="d-btn d-btn-primary" onClick={handleRechargeSubmit}>Recharge</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .mu-table-wrap { display: none; }
                .mu-cards { display: block; }
                @media (min-width: 768px) {
                    .mu-table-wrap { display: block; }
                    .mu-cards { display: none; }
                }
            `}</style>
        </div>
    );
};

export default ManageUser;
