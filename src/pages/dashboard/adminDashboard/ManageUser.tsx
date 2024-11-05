/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import Container from "../../../utils/Container";
import Loading from "../../../utils/Loading";
import Swal from "sweetalert2";



const ManageUser = () => {
    const { data, refetch, isLoading } = useGetAllUsersQuery(undefined);
    const [blockUser, { isLoading: isBlocking }] = useUpdateUserMutation();
    const handleBlockUser = async (user: any) => {
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

    if (isLoading || isBlocking) return <Loading />
    return (
        <Container>
            <div>
                <h2 className="text-xl font-bold mb-4">Manage Users</h2>
                <div className="overflow-x-auto">
                    {
                        data?.data.length === 0 ? (
                            <p className="text-center text-gray-600">No users found</p>
                        ) : (

                            <table className="table table-zebra w-full">
                                {/* Table Head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Balance</th>
                                        <th>Join Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data.map((user: any, index: number) => (
                                        <tr key={user.id} className={user.isBlocked ? "bg-red-100" : ""}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>${user.balance}</td>
                                            <td>{moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                            <td>{user.isDeleted ? "Blocked" : "Active"}</td>
                                            <td>
                                                {/* Block/Unblock Button */}
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
        </Container>
    );
};

export default ManageUser;
