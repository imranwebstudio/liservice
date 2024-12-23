import { NavLink } from "react-router-dom";
import AccountToggle from "./AccountToggle";
import Search from "./Search";
import { useAppSelector } from "../../redux/hooks";
import { userRole } from "../../redux/features/auth/authSlice";
import { FiDollarSign, FiList, FiPlus, FiSettings, FiUser } from "react-icons/fi";
import { TbSocial } from "react-icons/tb";
import { PiInvoice } from "react-icons/pi";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const role = useAppSelector(userRole)
    return (
        <div className={`fixed w-[260px] inset-0 z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:relative lg:translate-x-0 bg-base-100 p-3 sidebar`}>
            <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
                <AccountToggle />
                <Search />
                <ul className="  text-base-content ">

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
                                {/* <li onClick={() => setIsOpen(!isOpen)}>
                                                        <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                                            className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                                            to="/dashboard/singleOrder"
                                                        >
                                                            Customized Order
                                                        </NavLink>
                                                    </li> */}
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/services"
                                    >
                                       <TbSocial/> Services
                                    </NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/rechargeHistory"
                                    >
                                      <FiDollarSign/>  Recharge History
                                    </NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/orderHistory"
                                    >
                                       <PiInvoice/> Order History
                                    </NavLink>
                                </li>
                                <li onClick={() => setIsOpen(!isOpen)}>
                                    <NavLink style={{fontSize: "22px", margin: "20px 0px", display: "flex", gap: "10px", alignItems: "center"}}
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                        to="/dashboard/addBalance"
                                    >
                                       <FiPlus/> Add Balance
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
