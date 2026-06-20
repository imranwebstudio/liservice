import { NavLink } from "react-router-dom";
import AccountToggle from "./AccountToggle";
import { useAppSelector } from "../../redux/hooks";
import { userRole } from "../../redux/features/auth/authSlice";
import { FiDollarSign, FiGrid, FiList, FiPlus, FiSettings, FiUser } from "react-icons/fi";
import { TbSocial } from "react-icons/tb";
import { PiInvoice } from "react-icons/pi";

interface NavItem {
    to: string;
    icon: React.ReactNode;
    label: string;
    iconClass: string;
    exact?: boolean;
}

const adminLinks: NavItem[] = [
    { to: "/dashboard", icon: <FiGrid />, label: "Overview", iconClass: "bg-blue-100 text-blue-600", exact: true },
    { to: "/dashboard/addService", icon: <FiPlus />, label: "Add Service", iconClass: "bg-emerald-100 text-emerald-600" },
    { to: "/dashboard/manageServices", icon: <FiSettings />, label: "Manage Services", iconClass: "bg-indigo-100 text-indigo-600" },
    { to: "/dashboard/manageUsers", icon: <FiUser />, label: "Manage Users", iconClass: "bg-violet-100 text-violet-600" },
    { to: "/dashboard/manageOrders", icon: <FiList />, label: "Manage Orders", iconClass: "bg-amber-100 text-amber-600" },
    { to: "/dashboard/manageRecharges", icon: <FiDollarSign />, label: "Manage Recharges", iconClass: "bg-rose-100 text-rose-600" },
];

const userLinks: NavItem[] = [
    { to: "/dashboard", icon: <FiGrid />, label: "Overview", iconClass: "bg-blue-100 text-blue-600", exact: true },
    { to: "/dashboard/services", icon: <TbSocial />, label: "Services", iconClass: "bg-indigo-100 text-indigo-600" },
    { to: "/dashboard/orderHistory", icon: <PiInvoice />, label: "Order History", iconClass: "bg-violet-100 text-violet-600" },
    { to: "/dashboard/rechargeHistory", icon: <FiDollarSign />, label: "Recharge History", iconClass: "bg-emerald-100 text-emerald-600" },
    { to: "/dashboard/addBalance", icon: <FiPlus />, label: "Add Balance", iconClass: "bg-amber-100 text-amber-600" },
];

const SidebarItem = ({ item, onClick }: { item: NavItem; onClick: () => void }) => (
    <li onClick={onClick}>
        <NavLink
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                        ? "bg-primary text-primary-content shadow-sm"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[15px] transition-colors ${
                            isActive ? "bg-white/20 text-primary-content" : item.iconClass
                        }`}
                    >
                        {item.icon}
                    </span>
                    <span className="leading-none">{item.label}</span>
                </>
            )}
        </NavLink>
    </li>
);

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
    const role = useAppSelector(userRole) as 'admin' | 'user';
    const links = role === 'admin' ? adminLinks : userLinks;

    return (
        <aside
            className={`fixed w-70 top-0 left-0 h-full z-40 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 lg:relative lg:translate-x-0 bg-base-100 border-r border-base-200`}
        >
            <div className="flex flex-col h-full overflow-y-auto p-4 gap-4">
                <AccountToggle />

                <div>
                    <p className="text-[11px] font-bold text-base-content/30 uppercase tracking-widest px-3 mb-2">
                        {role === 'admin' ? 'Admin Controls' : 'Navigation'}
                    </p>
                    <ul className="space-y-0.5">
                        {links.map((item) => (
                            <SidebarItem key={item.to} item={item} onClick={() => setIsOpen(false)} />
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-base-200">
                    <p className="text-xs text-base-content/30 text-center">Li Service 24 &copy; 2024</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
