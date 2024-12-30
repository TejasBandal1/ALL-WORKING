import React, { useState } from "react";

const Header = ({ onSearch, onNewClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="flex justify-between items-center p-6 bg-teal-700 text-white shadow-md">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold">My Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* New Button */}
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-lg font-medium transition duration-300"
          onClick={onNewClick}
        >
          + New
        </button>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <i className="fas fa-search absolute top-2.5 right-3 text-gray-400"></i>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-xl">
          <i className="fas fa-bell hover:text-teal-300 cursor-pointer"></i>
          <i className="fas fa-cog hover:text-teal-300 cursor-pointer"></i>
          <i className="fas fa-user-circle hover:text-teal-300 cursor-pointer"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
