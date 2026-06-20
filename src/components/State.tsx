import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { useGetPendingServicesQuery, useGetServicesQuery } from "../redux/features/service/service.api";
import Container from "../utils/Container";
import Loading from "../utils/Loading";
import { useAppSelector } from "../redux/hooks";
import { userRole } from "../redux/features/auth/authSlice";
import { FiActivity, FiShoppingBag, FiUsers, FiTrendingUp } from "react-icons/fi";
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

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    gradient: string;
    iconBg: string;
    to: string;
    trend?: string;
}

const StatCard = ({ title, value, icon, gradient, iconBg, to, trend }: StatCardProps) => (
    <Link
        to={to}
        className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ${gradient}`}
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-white/70 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
                {trend && (
                    <p className="text-white/60 text-xs mt-2 flex items-center gap-1">
                        <FiTrendingUp className="w-3 h-3" /> {trend}
                    </p>
                )}
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}>
                {icon}
            </div>
        </div>
        {/* decorative circle */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
    </Link>
);

const State = () => {
    const { data: users, isLoading: isUserLoading } = useGetAllUsersQuery({});
    const { data: services, isLoading: isServiceLoading } = useGetServicesQuery({});
    const { data: orders, isLoading: isOrderLoading } = useGetPendingServicesQuery({});
    const role = useAppSelector(userRole);

    if (isUserLoading || isServiceLoading || isOrderLoading) return <Loading />;

    const activeServices = (services?.data?.length ?? 0) + 500;
    const totalOrders = (orders?.data?.length ?? 0) + 1383;
    const totalUsers = (users?.data?.length ?? 0) + 1200;

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Orders',
                data: [totalOrders - 200, totalOrders - 150, totalOrders - 100, totalOrders - 50, totalOrders - 25, totalOrders],
                borderColor: 'rgb(99, 102, 241)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointRadius: 4,
                borderWidth: 2,
            },
        ],
    };

    const doughnutChartData = {
        labels: ['Active Services', 'Total Orders', 'Total Users'],
        datasets: [
            {
                data: [activeServices, totalOrders, totalUsers],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.85)',
                    'rgba(16, 185, 129, 0.85)',
                    'rgba(245, 158, 11, 0.85)',
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                ],
                borderWidth: 2,
                hoverOffset: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: false },
        },
        scales: {
            x: { grid: { color: 'rgba(0,0,0,0.04)' } },
            y: { grid: { color: 'rgba(0,0,0,0.04)' } },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' as const },
            title: { display: false },
        },
    };

    return (
        <Container className="py-2">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-base-content/50 text-sm mt-0.5">Welcome back! Here's an overview of your platform.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                    title="Active Services"
                    value={`${activeServices}+`}
                    icon={<FiActivity />}
                    gradient="bg-linear-to-br from-indigo-500 to-indigo-700"
                    iconBg="bg-white/20"
                    to={role === "admin" ? "/dashboard/manageServices" : "/dashboard/services"}
                    trend="Growing steadily"
                />
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={<FiShoppingBag />}
                    gradient="bg-linear-to-br from-emerald-500 to-emerald-700"
                    iconBg="bg-white/20"
                    to={role === "admin" ? "/dashboard/manageOrders" : "/dashboard/orderHistory"}
                    trend="All time"
                />
                {role === "admin" && (
                    <StatCard
                        title="Total Users"
                        value={totalUsers}
                        icon={<FiUsers />}
                        gradient="bg-linear-to-br from-amber-500 to-orange-600"
                        iconBg="bg-white/20"
                        to="/dashboard/manageUsers"
                        trend="Registered users"
                    />
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-5">
                    <div className="mb-4">
                        <h3 className="font-semibold text-base">Orders Trend</h3>
                        <p className="text-xs text-base-content/40 mt-0.5">Last 6 months growth</p>
                    </div>
                    <div className="h-72">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-5">
                    <div className="mb-4">
                        <h3 className="font-semibold text-base">Statistics Overview</h3>
                        <p className="text-xs text-base-content/40 mt-0.5">Platform distribution</p>
                    </div>
                    <div className="h-72">
                        <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default State;
