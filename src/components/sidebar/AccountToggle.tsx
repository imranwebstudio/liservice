import { FiChevronDown, FiChevronUp, FiSun, FiUser } from "react-icons/fi";
import { logout, selectUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogOut, BiMoon } from "react-icons/bi";
import { useState } from "react";
import { useTheme } from "../../utils/ThemeContext";
import { useGetUserProfileQuery } from "../../redux/features/auth/authApi";

const AccountToggle = () => {
  const user = useAppSelector(selectUser);
  const { data } = useGetUserProfileQuery(undefined, { skip: !user, pollingInterval: 5000 });
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  const themeContext = useTheme(); // Use the custom hook
  const location = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    location("/");
  };

// console.log(themeContext);

  return (
    <div className="border-b border-gray-300 mt-4 pb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex p-0.5 hover:bg-base-300 rounded transition-color relative gap-2 w-full items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div>
          <span className="text-sm font-bold block">{user?.name} {user && <Link to="/dashboard/addBalance" className="font-bold text-xs md:text-md lg:text-lg"> ${data?.data?.balance}</Link>}</span>
          <span className="text-xs block text-stone-500">{user?.email}</span>
        </div>
        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>
      <div className={` ${isOpen ? "block" : "hidden"}`}>
        <NavLink to={"/dashboard/profile"} className="w-full flex gap-2 items-center  text-left text-lg py-2 px-4 hover:bg-base-300"><FiUser /> Profile</NavLink>
        <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left text-lg py-2 px-4 hover:bg-base-300 "> <BiLogOut /> Logout</button>
        <label className="swap swap-rotate mx-5">
          {/* Hidden checkbox controls the state */}
          <input type="checkbox" onChange={themeContext?.toggleTheme} checked={themeContext?.theme === 'dark'} />
          {
            themeContext?.theme === 'black' ? (
              <p className="flex items-center gap-2 w-full text-left text-lg py-2 hover:bg-base-300 ">
                <BiMoon /> <span>Dark Mood</span>
              </p>
            ) : (
              < p className="flex items-center gap-2 w-full text-left text-lg py-2  hover:bg-base-300 ">
                <FiSun /> <span>Light Mood</span>
              </ p>
            )
          }

        </label>
      </div>
    </div>
  );
};

export default AccountToggle;
