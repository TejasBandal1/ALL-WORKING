import React from "react";

const DashboardCard = ({ title, value, onClick }) => (
  <div className="bg-white p-4 rounded shadow cursor-pointer" onClick={onClick}>
    <h2 className="text-gray-600">{title}</h2>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default DashboardCard;
