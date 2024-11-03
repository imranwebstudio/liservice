import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectUser } from "../redux/features/auth/authSlice";
import logo1 from '../assets/logoWhite.png'
// import logo2 from '../assets/logoBlack.png'
import { useTheme } from "../utils/ThemeContext";
import { useGetUserProfileQuery } from "../redux/features/auth/authApi";

const Nav = () => {
    const user = useAppSelector(selectUser);
    const {data} = useGetUserProfileQuery(undefined, { skip: !user, pollingInterval: 5000});
    const themeContext = useTheme(); // Use the custom hook
    const location = useNavigate();
    // const role = useAppSelector(userRole);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        location("/");
    };


// console.log(data, isLoading);
    return (
        <div className="w-full fixed z-50 top-0 ">
            <div className="navbar justify-between">
                <div className="">
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
                            className={` menu menu-sm dropdown-content font-bold bg-red-500  rounded-box z-[1] mt-3 w-52 p-2 shadow`}>
                            <li>
                                <NavLink
                                    to="/service"
                                    className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-red-100 font"}
                                >
                                    Service
                                </NavLink>
                            </li>
                            {
                                user && // Conditional rendering for the Dashboard link
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-red-100"}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            }
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "text-red-100"}
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className=" text-xl">
                        <img className="w-10 md:w-20 mx-1 bg-black/80 p-1 rounded" src={logo1} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex bg-[#e20b0b] rounded-3xl">
                    <ul className="menu menu-horizontal font-bold px-1 ">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    ` ${isActive ? "text-blue-500 font-semibold bg-black rounded-3xl" : "text-red-100"}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/service"
                                className={({ isActive }) =>
                                    ` ${isActive ? "text-blue-500 font-semibold bg-black rounded-3xl" : "text-red-100"}`
                                }
                            >
                                Service
                            </NavLink>
                        </li>

                        {
                            user && // Conditional rendering for the Dashboard link
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => isActive ? "text-blue-500 font-semibold bg-black rounded-3xl" : "text-red-100"}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        }
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => isActive ? "text-blue-500 font-semibold bg-black rounded-3xl" : "text-red-100"}
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="">
                    {user &&  <Link to="/dashboard/addBalance" className="font-bold text-xs md:text-md lg:text-lg"> Balance: ${data?.data?.balance}</Link>}

                    <label className="swap swap-rotate mx-5">
                        {/* Hidden checkbox controls the state */}
                        <input type="checkbox" onChange={themeContext?.toggleTheme} checked={themeContext?.theme === 'dark'} />

                        {/* Sun icon for light mode */}
                        <svg
                            className="swap-on size-7 md:size-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* Moon icon for dark mode */}
                        <svg
                            className="swap-off size-7 md:size-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                    {
                        user ? (
                            <>
                               
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-7 md:w-10 rounded-full">
                                            <img src={user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="User Avatar" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <Link to="/profile" className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </Link>
                                        </li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link to="/register" className="btn btn-md">Login</Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Nav;
