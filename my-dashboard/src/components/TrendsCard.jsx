import React from "react";

const TrendsCard = ({ closedTickets, openTickets, pendingTickets }) => (
  <div className="col-span-2 bg-white p-4 rounded shadow">
    <h2 className="text-gray-600 mb-4">Today's Trends</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Closed Tickets */}
      <div className="bg-teal-100 p-4 rounded shadow flex flex-col items-center">
        <h3 className="text-teal-600 font-semibold mb-2">Closed Tickets</h3>
        <p className="text-teal-800 text-2xl font-bold">{closedTickets}</p>
        <p className="text-gray-600 text-sm">Closed today</p>
      </div>
      
      {/* Open Tickets */}
      <div className="bg-green-100 p-4 rounded shadow flex flex-col items-center">
        <h3 className="text-green-600 font-semibold mb-2">Open Tickets</h3>
        <p className="text-green-800 text-2xl font-bold">{openTickets}</p>
        <p className="text-gray-600 text-sm">Currently open</p>
      </div>
      
      {/* Pending Tickets */}
      <div className="bg-yellow-100 p-4 rounded shadow flex flex-col items-center">
        <h3 className="text-yellow-600 font-semibold mb-2">Pending Tickets</h3>
        <p className="text-yellow-800 text-2xl font-bold">{pendingTickets}</p>
        <p className="text-gray-600 text-sm">Pending review</p>
      </div>
    </div>
  </div>
);

// Example usage with dynamic data
const sampleData = {
  closedTickets: 42,
  openTickets: 15,
  pendingTickets: 8,
};

const App = () => (
  <div className="p-6">
    <TrendsCard
      closedTickets={sampleData.closedTickets}
      openTickets={sampleData.openTickets}
      pendingTickets={sampleData.pendingTickets}
    />
  </div>
);

export default App;
