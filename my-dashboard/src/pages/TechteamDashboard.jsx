import React from "react";
import { useNavigate } from "react-router-dom";

const TechTeamDashboard = () => {
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <div className="techteam-dashboard">
            <header className="dashboard-header">
                <h1>Tech Team Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main className="dashboard-main">
                <div className="dashboard-actions">
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/pages/tickets")}
                    >
                        View Tickets
                    </button>
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/pages/team-support")}
                    >
                        Team Support
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TechTeamDashboard;
