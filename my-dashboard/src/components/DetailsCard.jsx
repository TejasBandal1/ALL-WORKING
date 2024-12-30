import React from "react";

const DetailsCard = ({ title, details }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-gray-600 mb-4">{title}</h2>
    <div className="flex justify-between items-center mb-4">
      <p className="text-gray-600">Across helpdesk</p>
      <a
        href="#"
        className="text-blue-500"
        onClick={() => alert(`Viewing details for ${title}`)}
      >
        View details
      </a>
    </div>
    {details.map((detail, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <p className="text-gray-600 font-medium">{detail.label}</p>
        <p className="text-gray-800 font-semibold">{detail.value}</p>
      </div>
    ))}
  </div>
);

// Sample data for the card
const sampleDetails = [
  { label: "Total Tickets Created", value: "1,250" },
  { label: "Tickets Closed Today", value: "150" },
  { label: "Tickets Pending Review", value: "45" },
  { label: "Average Response Time", value: "2h 30m" },
  { label: "Support Agents Online", value: "25" },
  { label: "Customer Satisfaction", value: "92%" }
];

const DetailsCardDemo = () => (
  <DetailsCard title="Helpdesk Overview" details={sampleDetails} />
);

export default DetailsCardDemo;
