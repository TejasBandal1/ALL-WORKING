import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminMainDashboard from "./pages/AdminMainDashboard";
import TechTeamDashboard from "./pages/TechteamDashboard";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        // Check for token and role in localStorage
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");

        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const PrivateRoute = ({ children, role }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        if (userRole !== role) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                {/* Default route to LoginPage */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Role-based private routes */}
                <Route
                    path="/pages/admin-main-dashboard"
                    element={
                        <PrivateRoute role="Admin">
                            <AdminMainDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/pages/techteam-dashboard"
                    element={
                        <PrivateRoute role="Tech Team">
                            <TechTeamDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/pages/user-dashboard"
                    element={
                        <PrivateRoute role="User">
                            <UserDashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;