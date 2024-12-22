import { Outlet } from "react-router-dom";

const Dashboard2 = () => {
    return (
        <div className="rounded-lg pb-4 shadow min-h-screen">
            

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard2;
