import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const AccountToggle = () => {
 const user = useAppSelector(selectUser);
    return (
        <div className="border-b border-gray-300 mt-4 pb-4">
          <button className="flex p-0.5 hover:bg-stone-300 rounded transition-color relative gap-2 w-full items-center">
               <img
               src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
               className="size-8 rounded shrink-0 bg-violet-500 shadow"
               />
               <div>
                <span className="text-sm font-bold block">{user?.name}</span>
                <span className="text-xs block text-stone-500">{user?.email}</span>
               </div>
               <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs"/>
               <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs"/> 
          </button>
        </div>
    );
};

export default AccountToggle;
