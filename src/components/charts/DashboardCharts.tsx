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

interface DashboardChartsProps {
    activeServices: number;
    totalOrders: number;
    totalUsers: number;
}

const DashboardCharts = ({ activeServices, totalOrders, totalUsers }: DashboardChartsProps) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-4 h-[400px]">
                <h3 className="text-xl font-semibold mb-4">Orders Trend</h3>
                <Line data={lineChartData} options={chartOptions} />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 h-[400px]">
                <h3 className="text-xl font-semibold mb-4">Statistics Overview</h3>
                <Doughnut data={doughnutChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default DashboardCharts; 