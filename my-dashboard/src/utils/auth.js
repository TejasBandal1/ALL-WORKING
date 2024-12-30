// src/utils/auth.js
export const isAuthenticated = () => !!localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("userRole");
export const logout = () => localStorage.clear();
