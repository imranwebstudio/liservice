import { NavLink } from "react-router-dom";
import AccountToggle from "./AccountToggle";
import { useAppSelector } from "../../redux/hooks";
import { userRole } from "../../redux/features/auth/authSlice";
import { FiDollarSign, FiGrid, FiList, FiPlus, FiSettings, FiUser } from "react-icons/fi";
import { TbSocial } from "react-icons/tb";
import { PiInvoice } from "react-icons/pi";
import "../../pages/dashboard/dashboard.css";

interface NavItem {
    to: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean;
}

const adminLinks: NavItem[] = [
    { to: "/dashboard", icon: <FiGrid />, label: "Overview", exact: true },
    { to: "/dashboard/addService", icon: <FiPlus />, label: "Add Service" },
    { to: "/dashboard/manageServices", icon: <FiSettings />, label: "Manage Services" },
    { to: "/dashboard/manageUsers", icon: <FiUser />, label: "Manage Users" },
    { to: "/dashboard/manageOrders", icon: <FiList />, label: "Manage Orders" },
    { to: "/dashboard/manageRecharges", icon: <FiDollarSign />, label: "Manage Recharges" },
];

const userLinks: NavItem[] = [
    { to: "/dashboard", icon: <FiGrid />, label: "Overview", exact: true },
    { to: "/dashboard/services", icon: <TbSocial />, label: "Services" },
    { to: "/dashboard/orderHistory", icon: <PiInvoice />, label: "Order History" },
    { to: "/dashboard/rechargeHistory", icon: <FiDollarSign />, label: "Recharge History" },
    { to: "/dashboard/addBalance", icon: <FiPlus />, label: "Add Balance" },
];

const SidebarItem = ({ item, onClick }: { item: NavItem; onClick: () => void }) => (
    <li style={{ listStyle: 'none' }} onClick={onClick}>
        <NavLink
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
                `d-sidebar-nav-item${isActive ? ' active' : ''}`
            }
        >
            {({ isActive }) => (
                <>
                    <span
                        className="d-sidebar-nav-icon"
                        style={isActive ? { background: 'rgba(31,191,108,0.15)', color: '#1fbf6c' } : {}}
                    >
                        {item.icon}
                    </span>
                    <span>{item.label}</span>
                </>
            )}
        </NavLink>
    </li>
);

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) => {
    const role = useAppSelector(userRole) as 'admin' | 'user';
    const links = role === 'admin' ? adminLinks : userLinks;

    return (
        <aside className={`d-sidebar${isOpen ? '' : ' d-sidebar-closed'}`}>
            {/* Logo */}
            <div className="d-sidebar-logo">
                <div className="d-sidebar-logo-mark">L</div>
                <span>Li Service<span style={{ color: '#34d97e' }}>24</span></span>
            </div>

            <div style={{ padding: '0 12px', flex: 1 }}>
                <AccountToggle />

                <div>
                    <p className="d-sidebar-section-label">
                        {role === 'admin' ? 'Admin Controls' : 'Navigation'}
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {links.map((item) => (
                            <SidebarItem key={item.to} item={item} onClick={() => setIsOpen(false)} />
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div className="d-sidebar-footer">
                Li Service 24 &copy; 2024
            </div>
        </aside>
    );
};

export default Sidebar;
