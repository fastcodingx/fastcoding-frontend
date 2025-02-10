import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../styles/ChatDetails.css"; // Import the CSS file

const socket = io("https://fastcoding-backend.onrender.com");

const ChatDetails = ({ userId, chat, onClose }) => {
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
                  {
                    sender: data.sender,
                    message: data.message,
                    timestamp: new Date().toISOString(),
                  },
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

  const handleMessageSubmit = (activeChatId) => {
    console.log("hello");
    console.log("Mess", messages);
    if (newMessage.trim() && activeChatId) {
      const chatMessage = {
        contactId: activeChatId,
        sender: "User",
        message: newMessage,
        timestamp: new Date().toISOString(),
      };

      socket.emit("sendMessage", chatMessage);

      setNewMessage("");
    }
  };

  return (
    <div className="chat-details-main-container">
       
      <div className="chat-box">
      <div className="close-chat-icon" onClick={onClose}><IoMdArrowRoundBack/></div>
      <p>{`Support Id: ${chat._id}`}</p>
      <hr style={{border:"1.5px solid var(--primary)",marginBottom:"10px"}}></hr>
        <div className="chat-replies">
          {messages.map((message) =>
            message.chat?.map((reply, index) => {
              const isSender = reply.sender.toLowerCase() === "user";
              const messageDate = new Date(reply.timestamp).toLocaleString();

              return (
                <div
                  key={index}
                  className={`reply ${isSender ? "sent" : "received"}`}
                >
                  <div className="message-container">
                    <div className="message-bubble">{reply.message}</div>
                    <div className="message-time">{messageDate}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="chat-input-btn-send">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <div className="chat-input-btn-send-btn">
            <button onClick={() => handleMessageSubmit(chat._id)}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
