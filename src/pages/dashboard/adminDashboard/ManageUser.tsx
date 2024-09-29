import React, { useState } from "react";
import Container from "../../../utils/Container";

// Mock User Data
const mockUsers = [
    { id: 1, name: "Cy Ganderton", email: "cy@example.com", job: "Quality Control Specialist", favoriteColor: "Blue", isBlocked: false },
    { id: 2, name: "Hart Hagerty", email: "hart@example.com", job: "Desktop Support Technician", favoriteColor: "Purple", isBlocked: true },
    { id: 3, name: "Brice Swyre", email: "brice@example.com", job: "Tax Accountant", favoriteColor: "Red", isBlocked: false },
    { id: 4, name: "Emily Doe", email: "emily@example.com", job: "Marketing Specialist", favoriteColor: "Green", isBlocked: false },
];

const ManageUser = () => {
    // State to manage user data
    const [users, setUsers] = useState(mockUsers);

    // Function to block or unblock a user
    const toggleBlockUser = (userId: number) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
            )
        );
    };

    return (
        <Container>
            <div>
                <h2 className="text-xl font-bold mb-4">Manage Users</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={user.isBlocked ? "bg-red-100" : ""}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.job}</td>
                                    <td>{user.favoriteColor}</td>
                                    <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                                    <td>
                                        {/* Block/Unblock Button */}
                                        <button
                                            className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-warning"}`}
                                            onClick={() => toggleBlockUser(user.id)}
                                        >
                                            {user.isBlocked ? "Unblock" : "Block"}
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

export default ManageUser;
