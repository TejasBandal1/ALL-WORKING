import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        {/* Add dashboard components here */}
      </main>
    </div>
  );
};

export default DashboardPage;
