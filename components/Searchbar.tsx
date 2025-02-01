import React from "react";
import { FaLocationDot } from "react-icons/fa6";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchbarProps) => {
  return (
    <div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
      <input
        type="text"
        placeholder="Enter residency name or city"
        className="bg-transparent border-none outline-none w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaLocationDot className="relative right-4 text-xl hover:text-black cursor-pointer" />
    </div>
  );
};

export default Searchbar;