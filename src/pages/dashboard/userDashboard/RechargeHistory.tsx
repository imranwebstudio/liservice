import  { useState } from "react";

const RechargeHistory = () => {
  // Mock recharge data
  const [recharges] = useState([
    {
      id: 1,
      transactionId: "TXN12345",
      amount: "$100",
      status: "Completed",
      date: "2023-09-10",
    },
    {
      id: 2,
      transactionId: "TXN67890",
      amount: "$50",
      status: "Pending",
      date: "2023-09-15",
    },
    {
      id: 3,
      transactionId: "TXN54321",
      amount: "$200",
      status: "Failed",
      date: "2023-09-20",
    },
    {
      id: 4,
      transactionId: "TXN98765",
      amount: "$150",
      status: "Completed",
      date: "2023-09-25",
    },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recharge History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recharges.map((recharge, index) => (
              <tr key={recharge.id} className={recharge.status === "Failed" ? "bg-red-100" : ""}>
                <th>{index + 1}</th>
                <td>{recharge.transactionId}</td>
                <td>{recharge.amount}</td>
                <td>
                  <span
                    className={`${
                      recharge.status === "Completed"
                        ? "text-green-600"
                        : recharge.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {recharge.status}
                  </span>
                </td>
                <td>{recharge.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RechargeHistory;
