import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatPage = () => {
  const { ticketId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/tickets/${ticketId}`);
        setTicketDetails(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/tickets/${ticketId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchTicketDetails();
    fetchMessages();
  }, [ticketId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`http://127.0.0.1:8000/tickets/${ticketId}/messages`, {
        content: newMessage,
        sender: "client", // Adjust as per your roles (client/agent)
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-6 bg-teal-600 shadow-md">
        <h1 className="text-2xl font-bold text-white">Chat - {ticketDetails?.subject}</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.sender === "client" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </main>
      <footer className="p-4 bg-gray-200 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 border rounded-lg mr-4"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatPage;
