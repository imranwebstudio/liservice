import { FiSearch } from "react-icons/fi";

const Search = () => {
    return (
        <div className="mb-3">
            <div className="flex items-center gap-2 bg-base-200/60 border border-base-200 rounded-xl px-3 py-2 text-sm">
                <FiSearch className="w-3.5 h-3.5 text-base-content/30 shrink-0" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-sm placeholder:text-base-content/30 focus:outline-none"
                />
            </div>
        </div>
    );
};

export default Search;
