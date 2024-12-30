import React, { useState } from 'react';

const SidebarItem = ({ icon, label, onClick, isActive }) => (
    <div
        className={`p-3 rounded-lg flex items-center cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-teal-700 text-white' : 'hover:bg-teal-800 text-gray-300'
        }`}
        onClick={onClick}
    >
        <i className={`fas ${icon} mr-3 text-xl`}></i>
        <span className="text-sm font-medium">{label}</span>
    </div>
);

const AdminDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('EMAILS');

    const renderContent = () => {
        switch (selectedSection) {
            case 'EMAILS':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Email Addresses</h1>
                            <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
                                <i className="fas fa-plus mr-2"></i> Add Email
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Add your email addresses (like support@yourcompany.com) here.
                            <a href="#" className="text-teal-600 hover:underline"> Learn more about receiving emails in SupportBee</a>
                        </p>
                        <div className="bg-white p-4 rounded shadow-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-800">tejas@P&Q.co.in</span>
                                <i className="fas fa-cog text-gray-600 hover:text-gray-800 cursor-pointer"></i>
                            </div>
                            <hr className="border-t-2 border-teal-500 mb-2" />
                            <div className="flex flex-wrap">
                                {[{ label: 'Incoming Email Auto Response', color: 'bg-black' },
                                  { label: 'BCC', color: 'bg-black' },
                                  { label: 'Email After Archive', color: 'bg-green-500' },
                                  { label: 'SMTP', color: 'bg-black' }].map((item, index) => (
                                    <div key={index} className="w-full md:w-1/2 mb-2 flex items-center">
                                        <span className={`h-2 w-2 ${item.color} rounded-full mr-2`}></span>
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center text-gray-600">
                        <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
                        <p>Select a section from the sidebar to view details.</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-teal-900 text-white h-full p-4 overflow-y-auto">
                <h2 className="text-xl font-bold text-center mb-4">Admin Menu</h2>
                <SidebarItem icon="fa-envelope" label="EMAILS" onClick={() => setSelectedSection('EMAILS')} isActive={selectedSection === 'EMAILS'} />
                <SidebarItem icon="fa-user" label="USERS" onClick={() => setSelectedSection('USERS')} isActive={selectedSection === 'USERS'} />
                <SidebarItem icon="fa-users" label="TEAMS" onClick={() => setSelectedSection('TEAMS')} isActive={selectedSection === 'TEAMS'} />
                <SidebarItem icon="fa-tags" label="LABELS" onClick={() => setSelectedSection('LABELS')} isActive={selectedSection === 'LABELS'} />
                <SidebarItem icon="fa-file-alt" label="SNIPPETS" onClick={() => setSelectedSection('SNIPPETS')} isActive={selectedSection === 'SNIPPETS'} />
                <SidebarItem icon="fa-envelope-open-text" label="CONTACT FORM" onClick={() => setSelectedSection('CONTACT FORM')} isActive={selectedSection === 'CONTACT FORM'} />
                <SidebarItem icon="fa-filter" label="FILTERS" onClick={() => setSelectedSection('FILTERS')} isActive={selectedSection === 'FILTERS'} />
                <SidebarItem icon="fa-link" label="WEB HOOKS" onClick={() => setSelectedSection('WEB HOOKS')} isActive={selectedSection === 'WEB HOOKS'} />
                <SidebarItem icon="fa-plane" label="INTEGRATIONS" onClick={() => setSelectedSection('INTEGRATIONS')} isActive={selectedSection === 'INTEGRATIONS'} />
                <SidebarItem icon="fa-globe" label="PORTAL & KBEE HOSTING" onClick={() => setSelectedSection('PORTAL & KBEE HOSTING')} isActive={selectedSection === 'PORTAL & KBEE HOSTING'} />
                <SidebarItem icon="fa-clock" label="BUSINESS HOURS" onClick={() => setSelectedSection('BUSINESS HOURS')} isActive={selectedSection === 'BUSINESS HOURS'} />
                <SidebarItem icon="fa-file-invoice-dollar" label="BILLING" onClick={() => setSelectedSection('BILLING')} isActive={selectedSection === 'BILLING'} />
                <SidebarItem icon="fa-building" label="COMPANY" onClick={() => setSelectedSection('COMPANY')} isActive={selectedSection === 'COMPANY'} />
                <SidebarItem icon="fa-tachometer-alt" label="DASHBOARD" onClick={() => setSelectedSection('DASHBOARD')} isActive={selectedSection === 'DASHBOARD'} />
            </div>
            {/* Main Content */}
            <div className="w-4/5 p-8 bg-gray-100 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
