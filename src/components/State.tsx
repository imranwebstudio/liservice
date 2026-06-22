import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { useGetPendingServicesQuery, useGetServicesQuery } from "../redux/features/service/service.api";
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
import "../pages/dashboard/dashboard.css";

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
    statColor: string;
    statGlow: string;
    to: string;
    trend?: string;
}

const StatCard = ({ title, value, icon, statColor, statGlow, to, trend }: StatCardProps) => (
    <Link
        to={to}
        className="d-stat-card"
        style={{ '--stat-color': statColor, '--stat-glow': statGlow } as React.CSSProperties}
    >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
                <p className="d-stat-label">{title}</p>
                <p className="d-stat-value">{value}</p>
                {trend && (
                    <p className="d-stat-trend">
                        <FiTrendingUp size={11} /> {trend}
                    </p>
                )}
            </div>
            <div className="d-stat-icon" style={{ color: statColor }}>
                {icon}
            </div>
        </div>
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
                borderColor: '#1fbf6c',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(31,191,108,0.08)',
                pointBackgroundColor: '#1fbf6c',
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
                    'rgba(31,191,108,0.85)',
                    'rgba(45,212,207,0.85)',
                    'rgba(245,158,11,0.85)',
                ],
                borderColor: [
                    'rgba(31,191,108,1)',
                    'rgba(45,212,207,1)',
                    'rgba(245,158,11,1)',
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
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#aebcb2',
                    font: { family: 'Inter, sans-serif', size: 12 },
                    boxWidth: 12,
                },
            },
            title: { display: false },
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#74877b', font: { family: 'Inter, sans-serif', size: 11 } },
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#74877b', font: { family: 'Inter, sans-serif', size: 11 } },
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#aebcb2',
                    font: { family: 'Inter, sans-serif', size: 12 },
                    boxWidth: 12,
                    padding: 16,
                },
            },
            title: { display: false },
        },
    };

    return (
        <div className="d-page" style={{ background: 'transparent' }}>
            {/* Page Header */}
            <div className="d-page-header">
                <h1 className="d-page-title">Dashboard</h1>
                <p className="d-page-sub">Welcome back! Here&apos;s an overview of your platform.</p>
            </div>

            {/* Stat Cards */}
            <div className="d-grid-3" style={{ marginBottom: 24 }}>
                <StatCard
                    title="Active Services"
                    value={`${activeServices}+`}
                    icon={<FiActivity />}
                    statColor="#1fbf6c"
                    statGlow="rgba(31,191,108,0.3)"
                    to={role === "admin" ? "/dashboard/manageServices" : "/dashboard/services"}
                    trend="Growing steadily"
                />
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={<FiShoppingBag />}
                    statColor="#2dd4cf"
                    statGlow="rgba(45,212,207,0.3)"
                    to={role === "admin" ? "/dashboard/manageOrders" : "/dashboard/orderHistory"}
                    trend="All time"
                />
                {role === "admin" && (
                    <StatCard
                        title="Total Users"
                        value={totalUsers}
                        icon={<FiUsers />}
                        statColor="#fbbf24"
                        statGlow="rgba(245,158,11,0.3)"
                        to="/dashboard/manageUsers"
                        trend="Registered users"
                    />
                )}
            </div>

            {/* Charts */}
            <div className="d-grid-2">
                <div className="d-card">
                    <div className="d-card-header">
                        <div>
                            <h3 className="d-card-title">Orders Trend</h3>
                            <p className="d-card-sub">Last 6 months growth</p>
                        </div>
                    </div>
                    <div style={{ padding: '20px 20px', height: 280 }}>
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="d-card">
                    <div className="d-card-header">
                        <div>
                            <h3 className="d-card-title">Statistics Overview</h3>
                            <p className="d-card-sub">Platform distribution</p>
                        </div>
                    </div>
                    <div style={{ padding: '20px 20px', height: 280 }}>
                        <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default State;
