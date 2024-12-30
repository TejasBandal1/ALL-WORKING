import React from "react";
import { useNavigate } from "react-router-dom";

const AdminMainDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div>
          <button onClick={() => navigate("/admin-management")}>Manage Users</button>
          <button onClick={() => navigate("/support-page")}>Manage Tickets</button>
        </div>
      </main>
    </div>
  );
};

export default AdminMainDashboard;
