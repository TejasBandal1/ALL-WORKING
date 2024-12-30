import React from "react";

const Sidebar = ({ onNavigate }) => (
    <aside className="h-screen w-20 bg-teal-900 flex flex-col items-center py-4 space-y-6 shadow-lg sticky top-0">
        {/* Home Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("dashboard")}
        >
            <i className="fas fa-home text-white text-2xl"></i>
        </div>
        {/* Products Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("products")}
        >
            <i className="fa-regular fa-envelope text-white text-2xl"></i>
        </div>
        {/* Users Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("users")}
        >
            <i className="fa-solid fa-user-tie text-white text-2xl"></i>
        </div>
        {/* Reports Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("reports")}
        >
            <i className="fa-regular fa-file text-white text-2xl"></i>
        </div>
        {/* Ticket Management Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("Tickets")}
        >
            <i className="fa-solid fa-ticket text-white text-2xl"></i>
        </div>
        {/* Contacts Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("contacts")}
        >
            <i className="fa-solid fa-address-book text-white text-2xl"></i>
        </div>
        {/* Settings Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("settings")}
        >
            <i className="fas fa-cog text-white text-2xl"></i>
        </div>
        {/* Ticket Management */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("ticket-management")}
        >
            <i className="fa-solid fa-list-check text-white text-2xl"></i>
        </div>
        {/* Admin Management Button */}
        <div
            className="cursor-pointer p-3 rounded-lg hover:bg-teal-700 transition duration-200"
            onClick={() => onNavigate("admin-management")}
        >
            <i className="fa-solid fa-users-cog text-white text-2xl"></i>
        </div>
    </aside>
);

export default Sidebar;
