import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectUser } from "../redux/features/auth/authSlice";
import logoWhite from '../assets/logoWhite.png';
import logoBlack from '../assets/logoBlack.png';
import { useTheme } from "../utils/ThemeContext";
import { useGetUserProfileQuery } from "../redux/features/auth/authApi";
import { FiSun, FiMoon, FiUser, FiLogOut, FiGrid } from "react-icons/fi";

const Nav = () => {
    const user = useAppSelector(selectUser);
    const { data } = useGetUserProfileQuery(undefined, { skip: !user, pollingInterval: 5000 });
    const themeContext = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isDark = themeContext?.theme === 'night';

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-primary text-primary-content"
                : "text-base-content/60 hover:text-base-content hover:bg-base-200"
        }`;

    return (
        <nav className="w-full sticky z-50 top-0 bg-base-100/95 backdrop-blur-sm border-b border-base-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">

                {/* Logo — white logo for dark mode, black logo for light mode */}
                <Link to="/" className="flex items-center gap-2.5 shrink-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <img
                            src={isDark ? logoWhite : logoBlack}
                            alt="Li Service 24"
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <span className="font-bold text-base hidden sm:block tracking-tight">
                        Li Service <span className="text-primary">24</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-1">
                    <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
                    <li><NavLink to="/service" className={linkClass}>Services</NavLink></li>
                    {user && <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>}
                    <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                </ul>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    {user && (
                        <Link
                            to="/dashboard/addBalance"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                            <span>$</span>
                            <span>{data?.data?.balance ?? '0.00'}</span>
                        </Link>
                    )}

                    {/* Theme toggle */}
                    <button
                        onClick={themeContext?.toggleTheme}
                        className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-base-content"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                    </button>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer">
                                <div className="w-9 rounded-full ring-2 ring-primary/30 ring-offset-1 ring-offset-base-100">
                                    <img
                                        src={user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                                        alt="Avatar"
                                    />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-2 p-2 shadow-xl menu dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200 text-sm">
                                <li className="px-3 py-2">
                                    <span className="font-semibold text-base-content">{user?.name}</span>
                                    <span className="text-xs text-base-content/40 font-normal">{user?.email}</span>
                                </li>
                                <div className="divider my-1 h-px" />
                                <li>
                                    <Link to="/profile" className="flex items-center gap-2 rounded-lg">
                                        <FiUser className="w-4 h-4 text-base-content/50" /> Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className="flex items-center gap-2 rounded-lg">
                                        <FiGrid className="w-4 h-4 text-base-content/50" /> Dashboard
                                    </Link>
                                </li>
                                <div className="divider my-1 h-px" />
                                <li>
                                    <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg text-error">
                                        <FiLogOut className="w-4 h-4" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/register" className="btn btn-primary btn-sm rounded-full px-5 font-semibold">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
