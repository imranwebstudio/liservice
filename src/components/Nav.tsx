import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectUser } from "../redux/features/auth/authSlice";

const Nav = () => {
    // State to manage the theme, default is "bumblebee" from daisyUI
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'bumblebee');

    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    // Function to toggle the theme
    const toggleTheme = () => {
        const newTheme = theme === 'bumblebee' ? 'dark' : 'bumblebee'; // Toggle between 'bumblebee' and 'dark'
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save the selected theme in localStorage
        document.documentElement.setAttribute('data-theme', newTheme); // Apply the theme to <html> element
    };

    // Set the theme on component mount based on the saved preference in localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content font-bold bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <NavLink
                                    to="/service"
                                    className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600 font"}
                                >
                                    Service
                                </NavLink>
                            </li>
                            {
                                user && // Conditional rendering for the Dashboard link
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            }
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">LI SERVICE 24</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal font-bold px-1">
                        <li>
                            <NavLink
                                to="/service"
                                className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                            >
                                Service
                            </NavLink>
                        </li>
                        {
                            user && // Conditional rendering for the Dashboard link
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        }
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-gray-600"}
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <label className="swap swap-rotate mx-5">
                        {/* Hidden checkbox controls the state */}
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

                        {/* Sun icon for light mode */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* Moon icon for dark mode */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.avatar} alt="User Avatar" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><button onClick={() => dispatch(logout())}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/register" className="btn">Register</Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Nav;
