import React from "react";
import { Input } from "../UI/Input";
import Search from "../Icons/Search";

const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search Orders"
        className="rounded-xl py-5 bg-blue-50 focus:outline-0 pl-12"
      />
    </div>
  );
};

export default SearchBar;
