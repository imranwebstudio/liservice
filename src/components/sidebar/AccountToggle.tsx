import { FiHome, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { logout, selectUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../utils/ThemeContext";
import { useGetUserProfileQuery } from "../../redux/features/auth/authApi";

const AccountToggle = () => {
    const user = useAppSelector(selectUser);
    const { data } = useGetUserProfileQuery(undefined, { skip: !user, pollingInterval: 5000 });
    const dispatch = useAppDispatch();
    const themeContext = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div style={{ marginBottom: 16 }}>
            {/* User Card */}
            <div className="d-account-card">
                <img
                    className="d-account-avatar"
                    src={user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                    alt="avatar"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="d-account-name">{user?.name || 'User'}</p>
                    <p className="d-account-email">{user?.email}</p>
                </div>
                <Link to="/dashboard/addBalance" className="d-balance-badge">
                    ${data?.data?.balance ?? '0'}
                </Link>
            </div>

            {/* Quick Actions */}
            <div className="d-quick-actions">
                <NavLink to="/" className="d-quick-btn">
                    <FiHome size={13} /> Home
                </NavLink>
                <NavLink to="/dashboard/profile" className="d-quick-btn">
                    <FiUser size={13} /> Profile
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="d-quick-btn d-quick-btn-danger"
                >
                    <BiLogOut size={13} /> Logout
                </button>
                <button
                    onClick={themeContext?.toggleTheme}
                    className="d-quick-btn"
                >
                    {themeContext?.theme === 'night'
                        ? <><FiSun size={13} /> Light</>
                        : <><FiMoon size={13} /> Dark</>
                    }
                </button>
            </div>

            <div className="d-divider" />
        </div>
    );
};

export default AccountToggle;
