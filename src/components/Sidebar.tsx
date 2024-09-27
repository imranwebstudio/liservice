import { FiHome, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn m-5 btn-primary btn-outline drawer-button">
                        <FiMenu className="text-2xl" />
                    </label>
                    <Link className="btn btn-primary normal-case text-xl" to={"/"}>
                            <FiHome className="text-2xl" />
                        </Link>
                </div>
                    
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        
                        {/* Admin Items */}
                        <li><Link to={"/dashboard/addService"}>Add Services</Link></li>
                        <li><Link to={"/dashboard"}>Manage Orders</Link></li>

                        {/* User Items */}
                        <li><Link to={"/dashboard/singleOrder"}>Single Order</Link></li>
                        <li><Link to={"/dashboard/orderHistory"}>Order History</Link></li>
                        <li><Link to={"/dashboard/addBalance"}>Add Balance</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
