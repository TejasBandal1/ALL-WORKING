import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <div className="user-dashboard">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main className="dashboard-main">
                <div className="dashboard-actions">
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/pages/my-tickets")}
                    >
                        My Tickets
                    </button>
                    <button
                        className="dashboard-button"
                        onClick={() => navigate("/pages/user-profile")}
                    >
                        Profile
                    </button>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
