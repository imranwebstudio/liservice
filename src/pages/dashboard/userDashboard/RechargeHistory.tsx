/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useGetBalanceByUserIdQuery } from "../../../redux/features/balance/balance.api";
import Loading from "../../../utils/Loading";

const RechargeHistory = () => {
  const {data, isLoading} = useGetBalanceByUserIdQuery(undefined);
  console.log(data);
  

  if(isLoading) return <Loading />

  // Mock recharge data

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
              <th>Paid Taka</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.balanceRequest?.map((recharge: any, index: any) => (
              <tr key={recharge._id} className={recharge.status === "Failed" ? "bg-red-100" : ""}>
                <th>{index + 1}</th>
                <td>{recharge.reference}</td>
                <td>${recharge.paidTaka}</td>
                <td>৳{recharge.amount}</td>
                <td>
                  <span
                    className={`${
                      recharge.status === "approved"
                        ? "text-green-600"
                        : recharge.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {recharge.status}
                  </span>
                </td>
                <td>{moment(recharge.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RechargeHistory;
