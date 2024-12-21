import { useState } from "react";
import moment from "moment";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import Container from "../../../utils/Container";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";
import { useGiveBalanceByAdminMutation } from "../../../redux/features/balance/balance.api";
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
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, block it!",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Blocking...",
                        text: "Please wait while we process your request",
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });

                    try {
                        await blockUser({ id: user?._id, ...user, isDeleted: true }).unwrap();
                        Swal.fire("Blocked!", "User has been blocked.", "success");

                        refetch();
                    } catch (error) {
                        console.error("Failed to block user:", error);
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
            title: 'processing...',
            text: 'Please wait while we process your request',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const result = await giveBalance({ id: selectedUser?._id, amount: givenBalanceAmount }).unwrap();
        if (result.success) {
            Swal.fire("Success", "Balance added successfully", "success");
        } else {
            Swal.fire("Error", "Failed to add balance", "error");
        }
        handleCloseModal();
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const filteredUsers = data?.data.filter((user: User) =>
        Object.keys(user).some((key) =>
            typeof user[key as keyof User] === 'string' && (user[key as keyof User] as string).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (isLoading || isBlocking) return <Loading />
    return (
        <Container>
            <div>
                <h2 className="text-xl font-bold mb-4">Manage Users</h2>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input input-bordered mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="overflow-x-auto">
                    {
                        filteredUsers?.length === 0 ? (
                            <p className="text-center text-gray-600">No users found</p>
                        ) : (
                            <table className="table table-zebra w-full">
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
                                        <tr key={user._id} className={user.isBlocked ? "bg-red-100" : ""}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>${user.balance}</td>
                                            <td>{moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                            <td>{user.isDeleted ? "Blocked" : "Active"}</td>
                                            <td className="flex gap-2">
                                                <button className="btn btn-sm btn-primary" onClick={() => handleRechargeClick(user)}>Recharge</button>
                                                <button
                                                    className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-warning"}`}
                                                    onClick={() => handleBlockUser(user)}
                                                >
                                                    {user.isDeleted ? "Unblock" : "Block"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-box z-10">
                        <h3 className="font-bold text-lg">Give Balance to {selectedUser?.name}</h3>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Amount</span>
                            </label>
                            <input onChange={(e) => setGivenBalanceAmount(Number(e.target.value))} type="number" className="input input-bordered" placeholder="Enter amount" />
                        </div>

                        <div className="modal-action">
                            <button className="btn" onClick={handleCloseModal}>Close</button>
                            <button onClick={handleRechargeSubmit} className="btn btn-primary">Recharge</button>
                        </div>
                    </div>
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                </div>
            )}
        </Container>
    );
};

export default ManageUser;