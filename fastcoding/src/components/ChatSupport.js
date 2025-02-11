import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatDetails from "./ChatDetails"; // Import ChatDetails component
import "../styles/ChatSupport.css";

const socket = io("https://fastcoding-backend.onrender.com");

const ChatSupport = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://fastcoding-backend.onrender.com/api/contact/getallcontactbyuserid/${userId}`
        );
        const data = await response.json();

        if (response.ok && data.length > 0) {
          setMessages(data);
        } else {
          console.log("No messages found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

    fetchMessages();
  }, [userId]);

  const handleOpenChat = (chat) => {
    setSelectedChat(chat); // Store the selected chat details
  };

  return (
    <div className="support-history-content">
      <h2 className="support-h1">Support History</h2>

      {selectedChat ? (
        // Show ChatDetails component when a chat is selected
        <ChatDetails
          chat={selectedChat}
          onClose={() => setSelectedChat(null)}
          socket={socket}
          userId={userId}
        />
      ) : // Show list of chat summaries
      messages.length === 0 ? (
        <p>No support tickets found. Start a new ticket if you need assistance!</p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="message"
            onClick={() => handleOpenChat(message)}
          >
            <p className="supportIdTag">Support ID: {message._id}</p>
            <p className="supportMessagetext">{message.message}</p>
            <button>Chat</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatSupport;
