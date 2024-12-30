import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before a new attempt
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            });
    
            if (response.ok) {
                const { token, role } = await response.json();
                localStorage.setItem("token", token);
                localStorage.setItem("userRole", role);
    
                // Navigate based on role
                switch (role) {
                    case "Admin":
                        navigate("/pages/admin-main-dashboard");
                        break;
                    case "Tech Team":
                        navigate("/pages/techteam-dashboard");
                        break;
                    case "User":
                        navigate("/pages/user-dashboard");
                        break;
                    default:
                        setError("Invalid role");
                }
            } else {
                const errorMessage = await response.json();
                setError(errorMessage.detail || "Invalid credentials");
            }
        } catch (err) {
            setError("Server error, please try again.");
        }
    };
    

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="form-title">Welcome Back</h1>
                <p className="form-subtitle">Sign in to continue</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="form-button">
                        Login
                    </button>
                </form>
                <div className="form-footer">
                    <p>
                        Forgot your password? <a href="/reset">Reset it</a>
                    </p>
                    <p>
                        Don’t have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;