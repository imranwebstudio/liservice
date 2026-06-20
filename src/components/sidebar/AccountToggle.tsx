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
        <div className="pb-4 border-b border-base-200">
            {/* User Card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 mb-3">
                <div className="avatar shrink-0">
                    <div className="w-10 rounded-full ring-2 ring-primary/30 ring-offset-1 ring-offset-base-100">
                        <img
                            src={user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate leading-tight">{user?.name || 'User'}</p>
                    <p className="text-xs text-base-content/40 truncate">{user?.email}</p>
                </div>
                <Link
                    to="/dashboard/addBalance"
                    className="badge badge-primary badge-sm font-bold shrink-0 cursor-pointer hover:badge-outline transition-all"
                >
                    ${data?.data?.balance ?? '0'}
                </Link>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 gap-1">
                <NavLink
                    to="/"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors"
                >
                    <FiHome className="w-3.5 h-3.5" /> Home
                </NavLink>
                <NavLink
                    to="/dashboard/profile"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors"
                >
                    <FiUser className="w-3.5 h-3.5" /> Profile
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-error/70 hover:bg-error/10 hover:text-error transition-colors text-left"
                >
                    <BiLogOut className="w-3.5 h-3.5" /> Logout
                </button>
                <button
                    onClick={themeContext?.toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors"
                >
                    {themeContext?.theme === 'night'
                        ? <><FiSun className="w-3.5 h-3.5" /> Light</>
                        : <><FiMoon className="w-3.5 h-3.5" /> Dark</>
                    }
                </button>
            </div>
        </div>
    );
};

export default AccountToggle;
