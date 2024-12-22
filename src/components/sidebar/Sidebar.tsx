import { NavLink } from "react-router-dom";
import AccountToggle from "./AccountToggle";
import Search from "./Search";
import { useAppSelector } from "../../redux/hooks";
import { userRole } from "../../redux/features/auth/authSlice";
import { FiDollarSign, FiList, FiPlus, FiSettings, FiUser } from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const role = useAppSelector(userRole)
    return (
        <div className={`bg-gray-200 p-3 sidebar ${!isOpen && "hidden"} `}>
            <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
                <AccountToggle />
                <Search />
                <ul className=" bg-base-200 text-base-content ">

                    {
                        (role as 'admin' | 'user') === 'admin' && (
                            <ul className="">
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}} className={ ({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/addService"}> <FiPlus/> Add Services</NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}} className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageServices"}> <FiSettings/> Manage Services</NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}} className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageUsers"}><FiUser/>   Manage Users</NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}} className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageOrders"}> <FiList/> Manage Orders</NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}} className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"} to={"/dashboard/manageRecharges"}><FiDollarSign/> Manage Recharges</NavLink>
                                </li>
                            </ul>
                        )
                    }

                    {
                        (role as 'admin' | 'user') === 'user' && (
                            <ul className="">
                                {/* <li>
                                                        <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                                            to="/dashboard/singleOrder"
                                                        >
                                                            Customized Order
                                                        </NavLink>
                                                    </li> */}
                                <li>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/services"
                                    >
                                        Services
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/rechargeHistory"
                                    >
                                        Recharge History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/orderHistory"
                                    >
                                        Order History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
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
            {/* plain toggle */}
        </div>
    );
};

export default Sidebar;
