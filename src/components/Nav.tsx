import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectUser } from "../redux/features/auth/authSlice";
import logoWhite from '../assets/logoWhite.png';
import logoBlack from '../assets/logoBlack.png';
import { useTheme } from "../utils/ThemeContext";
import { useGetUserProfileQuery } from "../redux/features/auth/authApi";
import { FiSun, FiMoon, FiUser, FiLogOut, FiGrid, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const Nav = () => {
    const user = useAppSelector(selectUser);
    const { data } = useGetUserProfileQuery(undefined, { skip: !user, pollingInterval: 5000 });
    const themeContext = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isDark = themeContext?.theme === 'night';
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setMobileOpen(false);
        navigate("/");
    };

    const closeMobile = () => setMobileOpen(false);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-primary text-primary-content"
                : "text-base-content/60 hover:text-base-content hover:bg-base-200"
        }`;

    const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive
                ? "bg-primary text-primary-content"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200"
        }`;

    return (
        <nav className="w-full sticky z-50 top-0 bg-base-100/95 backdrop-blur-sm border-b border-base-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={closeMobile}>
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
                   <ThemeToggle />

                    {/* Desktop: avatar dropdown */}
                    {user ? (
                        <div className="dropdown dropdown-end hidden lg:block">
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
                        <Link to="/register" className="hidden lg:inline-flex btn btn-primary btn-sm rounded-full px-5 font-semibold">
                            Login
                        </Link>
                    )}

                    {/* Hamburger — visible below lg */}
                    <button
                        className="lg:hidden btn btn-ghost btn-sm btn-circle text-base-content/70"
                        onClick={() => setMobileOpen(o => !o)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-base-100 border-t border-base-200 px-4 py-4 flex flex-col gap-1">

                    {/* Mobile nav links */}
                    <NavLink to="/" end className={mobileLinkClass} onClick={closeMobile}>Home</NavLink>
                    <NavLink to="/service" className={mobileLinkClass} onClick={closeMobile}>Services</NavLink>
                    {user && (
                        <NavLink to="/dashboard" className={mobileLinkClass} onClick={closeMobile}>Dashboard</NavLink>
                    )}
                    <NavLink to="/about" className={mobileLinkClass} onClick={closeMobile}>About</NavLink>

                    <div className="divider my-1" />

                    {user ? (
                        <>
                            {/* User info */}
                            <div className="flex items-center gap-3 px-4 py-2 mb-1">
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30">
                                    <img
                                        src={user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-sm text-base-content truncate">{user?.name}</span>
                                    <span className="text-xs text-base-content/40 truncate">{user?.email}</span>
                                </div>
                                <Link
                                    to="/dashboard/addBalance"
                                    onClick={closeMobile}
                                    className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 shrink-0"
                                >
                                    <span>$</span>
                                    <span>{data?.data?.balance ?? '0.00'}</span>
                                </Link>
                            </div>

                            <NavLink to="/profile" className={mobileLinkClass} onClick={closeMobile}>
                                <FiUser className="w-4 h-4 mr-2 text-base-content/50" /> Profile
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-error hover:bg-error/10 transition-colors"
                            >
                                <FiLogOut className="w-4 h-4 mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/register"
                            onClick={closeMobile}
                            className="btn btn-primary rounded-full font-semibold mt-1"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
