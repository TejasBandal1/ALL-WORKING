import React, { useEffect, useState } from "react";
import axios from "axios";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("Date created");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [emailSendingStates, setEmailSendingStates] = useState({});

  // Fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/tickets?skip=${(page - 1) * 10}&limit=10`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setTickets((prevTickets) => [...prevTickets, ...response.data]);
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      alert("Failed to load tickets. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page]);

  const safeCompare = (a, b) => {
    if (a === undefined || a === null) return "";
    return a.toString(); 
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setIsDropdownOpen(false);

    const sortedTickets = [...tickets].sort((a, b) => {
      switch (sortOption) {
        case "Priority":
          const priorityA = safeCompare(a.priority, b.priority);
          const priorityB = safeCompare(b.priority, a.priority);
          return priorityA.localeCompare(priorityB);

        case "Date created":
          const dateA = new Date(safeCompare(a.created_at, b.created_at));
          const dateB = new Date(safeCompare(b.created_at, a.created_at));
          return dateA - dateB;

        case "Status":
          const statusA = safeCompare(a.status, b.status);
          const statusB = safeCompare(b.status, a.status);
          return statusA.localeCompare(statusB);

        default:
          return 0;
      }
    });

    setTickets(sortedTickets);
  };

  const loadMoreTickets = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      setIsUpdating(true); 
      await axios.patch(
        `http://127.0.0.1:8000/tickets/${ticketId}/status`,
        { status: newStatus }
      );

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error("Failed to update ticket status:", error);
      alert("Failed to update ticket status. Please try again.");
    } finally {
      setIsUpdating(false); 
    }
  };

  const sendEmailNotification = async (ticketId) => {
    setEmailSendingStates((prevStates) => ({
      ...prevStates,
      [ticketId]: true,
    }));

    try {
      await axios.post(`http://127.0.0.1:8000/tickets/${ticketId}/notify`);
      alert("Email notification sent successfully!");
    } catch (error) {
      console.error("Failed to send email notification:", error);
      alert("Failed to send email notification. Please try again.");
    } finally {
      setEmailSendingStates((prevStates) => ({
        ...prevStates,
        [ticketId]: false,
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-8 py-5 bg-teal-800 text-white shadow-lg">
        <h1 className="text-2xl font-semibold tracking-wide">Ticket Management</h1>
      </header>
      <main className="flex-1 px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <button
              aria-label="Sort tickets by"
              className="bg-white border border-teal-600 px-5 py-2 rounded-full shadow-md flex items-center text-teal-700 font-medium hover:bg-teal-50 transition duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Sort by: {sortBy}
              <i className="fas fa-caret-down ml-2"></i>
            </button>
            {isDropdownOpen && (
              <ul className="absolute mt-2 w-56 bg-white border border-teal-300 rounded-lg shadow-lg">
                {["Date created", "Priority", "Status"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 text-teal-600 hover:bg-teal-50 hover:text-teal-800 cursor-pointer"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-teal-700 font-semibold text-lg">{ticket.subject}</h2>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      ticket.priority === "High"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{ticket.description}</p>
                <div className="text-gray-500 text-xs space-y-1">
                  <p>
                    <strong>Status:</strong>{" "}
                    <select
                      aria-label="Change ticket status"
                      className="border rounded-lg px-3 py-2 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={ticket.status || "Open"}
                      onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </p>
                  <p>
                    <strong>Category:</strong> {ticket.category} |{" "}
                    <strong>Subcategory:</strong> {ticket.subcategory}
                  </p>
                  <p>
                    <strong>Email:</strong> {ticket.email}
                  </p>
                  <p>
                    <strong>Department:</strong> {ticket.department}
                  </p>
                  <button
                    onClick={() => sendEmailNotification(ticket._id)}
                    disabled={emailSendingStates[ticket._id] || false}
                    className="px-5 py-2 mt-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200"
                  >
                    {emailSendingStates[ticket._id] ? "Sending..." : "Send Email Notification"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tickets available.</p>
          )}
        </div>
        {hasMore ? (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreTickets}
              className="px-8 py-3 bg-teal-700 text-white rounded-full shadow-md hover:bg-teal-800 transition duration-200"
            >
              Load More
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">No more tickets available.</p>
        )}
      </main>
    </div>
  );
};

export default TicketManagement;
