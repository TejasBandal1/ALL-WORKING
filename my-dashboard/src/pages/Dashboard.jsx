import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import TrendsCard from "../components/TrendsCard";
import DetailsCard from "../components/DetailsCard";
import CreateSupportTicket from "../components/CreateSupportTicket";
import AdminDashboard from "../components/AdminDashboard"; // Import AdminDashboard
import SupportPage from "../components/SupportPage"; // Import SupportPage
import SettingsPage from "../components/SettingsPage"; // Import SettingsPage
import ContactsPage from "../components/ContactsPage"; // Import ContactsPage
import TicketManagement from "../components/TicketManagement"; // Import TicketManagement
import AdminManagement from "../components/AdminManagement"; // Import AdminManagement

const Dashboard = () => {
    const [isCreatingTicket, setIsCreatingTicket] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard"); // Default page is "dashboard"

    const handleNewClick = () => {
        setIsCreatingTicket(true); // Show the support ticket creation form
    };

    const handleCancelTicket = () => {
        setIsCreatingTicket(false); // Close the support ticket form
    };

    const handleSearch = (term) => {
        console.log("Searching for:", term); // Replace this with actual search functionality
    };

    const handleCardClick = (title) => {
        alert(`Clicked on ${title} card!`); // Replace with functionality if needed
    };

    const handleNavigation = (page) => {
        setCurrentPage(page); // Update the current page
        if (page === "Tickets") {
            setIsCreatingTicket(true); // Special case: open ticket form for "Tickets"
        } else {
            setIsCreatingTicket(false); // Close the ticket form for other pages
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case "users":
                return <AdminDashboard />;
            case "products":
                return <SupportPage />;
            case "contacts":
                return <ContactsPage />;
            case "settings":
                return <SettingsPage />;
            case "ticket-management":
                return <TicketManagement />;
            case "admin-management":
                return <AdminManagement />; // Handle Admin Management case
            case "Tickets":
                return (
                    <CreateSupportTicket onCancel={handleCancelTicket} />
                );
            default:
                return (
                    <>
                        <Header onSearch={handleSearch} onNewClick={handleNewClick} />
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            {["Unresolved", "Overdue", "Due today", "Open", "On hold", "Unassigned"].map(
                                (title, i) => (
                                    <DashboardCard
                                        key={i}
                                        title={title}
                                        value={Math.floor(Math.random() * 10)}
                                        onClick={() => handleCardClick(title)}
                                    />
                                )
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <TrendsCard />
                            <DetailsCard title="Unresolved tickets" details={[{ label: "Group", value: "Open" }]} />
                            <DetailsCard title="To-do" details={[{ label: "No tasks", value: "" }]} />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar onNavigate={handleNavigation} />
            <main className="flex-1 p-6">
                {isCreatingTicket ? (
                    <CreateSupportTicket onCancel={handleCancelTicket} />
                ) : (
                    renderPage()
                )}
            </main>
        </div>
    );
};

export default Dashboard;
