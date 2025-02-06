import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Initialize Socket.IO connection
const socket = io("http://localhost:8080"); // Update with your backend URL

const ChatSupport = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState(null); // Stores the active chat ID

  // Fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/contact/getallcontactbyuserid/${userId}`);
        const data = await response.json();
          console.log("Res",response)
          console.log("Data",data)
        if (response.ok && data.length > 0) {
          setMessages(data);
        } else {
          console.log("No messages found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === data.contactId
            ? { ...msg, chat: [...msg.chat, { sender: data.sender, message: data.message }] }
            : msg
        )
      );
    };
  
    socket.on("receiveMessage", handleReceiveMessage);
  
    return () => {
      socket.off("receiveMessage", handleReceiveMessage); // Cleanup listener on unmount
    };
  }, []); // Empty dependency ensures it runs only once
  
  // Handle opening chat and setting contactId
  const handleOpenChat = (contactId) => {
    setActiveChatId(activeChatId === contactId ? null : contactId);
  };

  // Handle sending messages
  const handleMessageSubmit = () => {
    if (newMessage.trim() && activeChatId) {
      const chatMessage = {
        contactId: activeChatId,
        sender: "User",
        message: newMessage,
      };

      socket.emit("sendMessage", chatMessage); // Send message to backend

      setNewMessage(""); // Clear input field
    }
  };

  return (
    <div className="support-history-content">
      <h2>Support History</h2>
      {messages.length === 0 ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} className="message">
            <p className="supportIdTag">Support ID: #{message._id}</p>
            <p className="supportMessagetext">{message.message}</p>
            <button onClick={() => handleOpenChat(message._id)}>
              {activeChatId === message._id ? "Close Chat" : "Chat"}
            </button>

            {activeChatId === message._id && (
              <div className="chat-box">
                <div className="chat-replies">
                  {message.chat?.map((reply, index) => (
                    <div key={index} className={`reply ${reply.sender.toLowerCase()}`}>
                      <strong>{reply.sender}:</strong> <span>{reply.message}</span>
                    </div>
                  ))}
                </div>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button onClick={handleMessageSubmit}>Send</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ChatSupport;
