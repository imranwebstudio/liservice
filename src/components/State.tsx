import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { useGetPendingServicesQuery, useGetServicesQuery } from "../redux/features/service/service.api";
import Container from "../utils/Container";
import Loading from "../utils/Loading";

const State = () => {
    const { data: users, isLoading: isUserLoading } = useGetAllUsersQuery({});
    const { data: services, isLoading: isServiceLoading } = useGetServicesQuery({});
    const { data: orders, isLoading: isOrderLoading } = useGetPendingServicesQuery({});

    if (isUserLoading || isServiceLoading || isOrderLoading) return <Loading />
    return (
        <Container className="flex justify-center py-5">
            <div className="stats shadow hidden md:flex">
                <div className="stat">
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
                    <Link to={"/dashboard/manageServices"}>
                        <div className="stat-title">Active Services</div>
                        <div className="stat-value">{services?.data.length}</div>
                    </Link>
                </div>

                <div className="stat">
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
                    <Link to={"/dashboard/manageOrders"}>
                        <div className="stat-title">Total Orders</div>
                        <div className="stat-value">{orders?.data?.length}</div>
                    </Link>
                </div>

                <div className="stat">
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
                        <div className="stat-value">{users?.data?.length}</div>
                    </Link>
                </div>

            </div>
        </Container>
    );
};

export default State;
