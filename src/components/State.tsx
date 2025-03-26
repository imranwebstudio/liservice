import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { useGetPendingServicesQuery, useGetServicesQuery } from "../redux/features/service/service.api";
import Container from "../utils/Container";
import Loading from "../utils/Loading";
import { useAppSelector } from "../redux/hooks";
import { userRole } from "../redux/features/auth/authSlice";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const State = () => {
    const { data: users, isLoading: isUserLoading } = useGetAllUsersQuery({});
    const { data: services, isLoading: isServiceLoading } = useGetServicesQuery({});
    const { data: orders, isLoading: isOrderLoading } = useGetPendingServicesQuery({});
    const role = useAppSelector(userRole);

    if (isUserLoading || isServiceLoading || isOrderLoading) return <Loading />

    const activeServices = services?.data.length + 500;
    const totalOrders = orders?.data?.length + 1383;
    const totalUsers = users?.data?.length + 1200;

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Orders',
                data: [totalOrders - 200, totalOrders - 150, totalOrders - 100, totalOrders - 50, totalOrders - 25, totalOrders],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Active Services', 'Total Orders', 'Total Users'],
        datasets: [
            {
                data: [activeServices, totalOrders, totalUsers],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Dashboard Statistics',
            },
        },
    };

    return (
        <Container className="py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="stat bg-white rounded-lg shadow-lg p-4">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <Link to={`${role === "admin" ? "/dashboard/manageServices" : "/dashboard/services"}`}>
                        <div className="stat-title">Active Services</div>
                        <div className="stat-value">{activeServices}+</div>
                    </Link>
                </div>

                <div className="stat bg-white rounded-lg shadow-lg p-4">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <Link to={`${role === "admin" ? "/dashboard/manageOrders" : "/dashboard/orderHistory"}`}>
                        <div className="stat-title">Total Orders</div>
                        <div className="stat-value">{totalOrders}</div>
                    </Link>
                </div>

                {role === "admin" && (
                    <div className="stat bg-white rounded-lg shadow-lg p-4">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                        </div>
                        <Link to={"/dashboard/manageServices"}>
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value">{totalUsers}</div>
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-4 md:py-10 h-[600px]">
                    <h3 className="text-xl font-semibold mb-4">Orders Trend</h3>
                    <Line data={lineChartData} options={chartOptions} />
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 md:py-12 h-[600px]">
                    <h3 className="text-xl font-semibold mb-4">Statistics Overview</h3>
                    <Doughnut data={doughnutChartData} options={chartOptions} />
                </div>
            </div>
        </Container>
    );
};

export default State; 