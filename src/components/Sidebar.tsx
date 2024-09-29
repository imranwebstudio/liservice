import { FiHome, FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const role: 'user' | 'admin' = 'user';
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn m-5 lg:hidden btn-primary btn-outline drawer-button">
                        <FiMenu className="text-2xl" />
                    </label>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full  w-80 p-4">
                        <NavLink className="btn btn-primary normal-case text-xl" to={"/"}>
                            <FiHome className="text-2xl" />
                        </NavLink>
                        {/* Admin Items */}
                        {
                            (role as 'admin' | 'user') === 'admin' && (
                                <ul className="my-10">
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard"}>Statistics</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/addService"}>Add Services</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageServices"}>Manage Services</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageUsers"}>Manage Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageOrders"}>Manage Orders</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageRecharges"}>Manage Recharges</NavLink>
                                    </li>
                                </ul>
                            )
                        }

                        {
                            (role as 'admin' | 'user') === 'user' && (
                                <ul className="my-10">
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                            to="/dashboard/singleOrder"
                                        >
                                            Single Order
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                            to="/dashboard/services"
                                        >
                                            Services
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                            to="/dashboard/rechargeHistory"
                                        >
                                            Recharge History
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                            to="/dashboard/orderHistory"
                                        >
                                            Order History
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                            to="/dashboard/addBalance"
                                        >
                                            Add Balance
                                        </NavLink>
                                    </li>
                                </ul>
                            )
                        }

                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
