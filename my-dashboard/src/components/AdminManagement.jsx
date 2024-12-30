import React, { useState } from "react";

const AdminManagement = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "Admin", // Default role
        password: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const checkPasswordStrength = (password) => {
        if (password.length < 6) return "Weak";
        if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return "Strong";
        return "Medium";
    };

    const passwordStrength = checkPasswordStrength(formData.password);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("User added successfully!");
                setErrorMessage("");
                setFormData({ username: "", email: "", role: "Admin", password: "" });
            } else {
                const errorData = await response.json();
                handleError(errorData);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (errorData) => {
        switch (errorData.detail) {
            case "User already exists":
                setErrorMessage("The email is already registered. Try another.");
                break;
            case `Invalid email: ${formData.email}`:
                setErrorMessage("Please enter a valid email address.");
                break;
            default:
                setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-teal-700 text-center mb-6">
                    User Management
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Create and manage users for your application with ease.
                </p>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Username Input */}
                    <div>
                        <label className="block text-sm font-semibold text-teal-800">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-teal-800">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-teal-800">
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        >
                            <option value="Admin">Admin</option>
                            <option value="Tech Team">Tech Team</option>
                            <option value="User">User</option>
                        </select>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-semibold text-teal-800">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter password"
                            required
                        />
                        <small
                            className={`text-sm mt-1 block ${
                                passwordStrength === "Weak"
                                    ? "text-red-500"
                                    : passwordStrength === "Medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}
                        >
                            Password Strength: {passwordStrength}
                        </small>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-200 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Add User"}
                    </button>
                </form>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="mt-4 p-4 bg-green-50 text-green-600 border border-green-200 rounded-lg">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminManagement;
