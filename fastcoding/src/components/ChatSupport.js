import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://fastcoding-backend.onrender.com");

const ChatSupport = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://fastcoding-backend.onrender.com/api/contact/getallcontactbyuserid/${userId}`
        );
        const data = await response.json();
        console.log("Res", response);
        console.log("Data", data);
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
            ? {
                ...msg,
                chat: [
                  ...msg.chat,
                  { sender: data.sender, message: data.message },
                ],
              }
            : msg
        )
      );
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const handleOpenChat = (contactId) => {
    setActiveChatId(activeChatId === contactId ? null : contactId);
  };

  const handleMessageSubmit = () => {
    if (newMessage.trim() && activeChatId) {
      const chatMessage = {
        contactId: activeChatId,
        sender: "User",
        message: newMessage,
      };

      socket.emit("sendMessage", chatMessage);

      setNewMessage("");
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
            <p className="supportIdTag">Support ID: {message._id}</p>
            <p className="supportMessagetext">{message.message}</p>
            <button onClick={() => handleOpenChat(message._id)}>
              {activeChatId === message._id ? "Close Chat" : "Chat"}
            </button>

            {activeChatId === message._id && (
              <div className="chat-box">
                <div className="chat-replies">
                  {message.chat?.map((reply, index) => (
                    <div
                      key={index}
                      className={`reply ${reply.sender.toLowerCase()}`}
                    >
                      <strong>{reply.sender}:</strong>{" "}
                      <span>{reply.message}</span>
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
