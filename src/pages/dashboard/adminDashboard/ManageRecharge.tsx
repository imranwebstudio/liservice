/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState } from "react";
import Container from "../../../utils/Container";

// Mock Recharge Data
const mockRecharges = [
    { id: 1, name: "John Doe", email: "john@example.com", amountRecharged: "$100", balance: "$80", lastRecharge: "2024-09-25" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", amountRecharged: "$150", balance: "$120", lastRecharge: "2024-09-20" },
    { id: 3, name: "Michael Johnson", email: "michael@example.com", amountRecharged: "$50", balance: "$10", lastRecharge: "2024-09-15" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", amountRecharged: "$200", balance: "$190", lastRecharge: "2024-09-10" },
    { id: 5, name: "Chris Lee", email: "chris@example.com", amountRecharged: "$75", balance: "$50", lastRecharge: "2024-09-12" },
];

const ManageRecharges = () => {
    // State to manage recharge data
    const [recharges, _setRecharges] = useState(mockRecharges);

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
                                <th>Email</th>
                                <th>Amount Recharged</th>
                                <th>Balance</th>
                                <th>Last Recharge</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recharges.map((recharge, index) => (
                                <tr key={recharge.id}>
                                    <th>{index + 1}</th>
                                    <td>{recharge.name}</td>
                                    <td>{recharge.email}</td>
                                    <td>{recharge.amountRecharged}</td>
                                    <td>{recharge.balance}</td>
                                    <td>{recharge.lastRecharge}</td>
                                    <td>
                                        {/* Button to Refund Recharge */}
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => alert(`Refund issued for ${recharge.name}`)}
                                        >
                                            Refund
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
