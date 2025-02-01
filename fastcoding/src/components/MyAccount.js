import React, { useState, useEffect } from "react";
import { FaUser, FaGift, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import CodeCard from "./CodeCard";
import Loading from "./Loading";
import API_URL from "../config";
import "../styles/MyAccount.css";
import { useUser } from "./UserContext";

const MyAccount = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");
  const { user, logout } = useUser();

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "User",
      text: "I have an issue with my order",
      isChatOpen: false,
      replies: [
        {
          user: "Admin",
          text: "Sorry for the inconvenience. Could you provide more details?",
        },
      ],
    },
    {
      id: 2,
      user: "User",
      text: "I need help with my payment",
      isChatOpen: false,
      replies: [
        {
          user: "Admin",
          text: "Please check your payment method. Is everything correct?",
        },
      ],
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleToggleChat = (id) => {
    setMessages(
      messages.map((message) =>
        message.id === id
          ? { ...message, isChatOpen: !message.isChatOpen }
          : message
      )
    );
  };

  const handleMessageSubmit = (id) => {
    if (newMessage.trim()) {
      setMessages(
        messages.map((message) =>
          message.id === id
            ? {
                ...message,
                replies: [
                  ...(message.replies || []),
                  { user: "User", text: newMessage }, // User sends a message
                  {
                    user: "Admin",
                    text: "This is an admin response to your message.",
                  }, // Dummy admin reply
                ],
              }
            : message
        )
      );
      setNewMessage("");
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/content/options/React/Header`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const language = "javascript";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    {
      name: "Profile",
      id: "profile",
      icon: <FaUser style={{ marginRight: 10 }} />,
    },
    {
      name: "My Codes",
      id: "myCodes",
      icon: <FaGift style={{ marginRight: 10 }} />,
    },
    {
      name: "Support History",
      id: "supportHistory",
      icon: <FaHeadset style={{ marginRight: 10 }} />,
    },
    {
      name: "Logout",
      id: "logout",
      icon: <FaSignOutAlt style={{ marginRight: 10 }} />,
    },
  ];

  const handleSectionChange = (id) => {
    setActiveSection(id);
  };

  return (
    <div className="my-account-container">
      <div className="profilesidebar">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => handleSectionChange(item.id)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="maincontent">
        {activeSection === "profile" && (
          <div className="profile-content">
            <h2
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "24px",
              }}
            >
              Manage Your Profile
            </h2>
            <div className="profile-info">
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={user?.email?.split("@")[0] || "username"}
                  readOnly
                />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" value={user?.email || "email"} readOnly />
              </div>
              <div style={{ marginTop: 14, marginBottom: 10 }}>
                <h3>Change your password to keep your account secure</h3>
              </div>
              <div>
                <label>Old Password:</label>
                <input type="password" value="" />
              </div>
              <div>
                <label>New Password:</label>
                <input type="password" value="" />
              </div>
              <div>
                <label>New Confirm Password:</label>
                <input type="password" value="" />
              </div>
              <div className="saveChangesBtn">
                <button>Update Profile</button>
              </div>
            </div>
          </div>
        )}
        {activeSection === "myCodes" && (
          <div className="my-codes-content">
            {loading ? (
              <Loading />
            ) : (
              options.map((code, index) => (
                <React.Fragment key={index}>
                  <CodeCard code={code} index={index} language={language} />
                  {index !== options.length - 1 && (
                    <hr style={{ border: "1px solid black" }} />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        )}
        {activeSection === "supportHistory" && (
          <div className="support-history-content">
            <h2>Support History</h2>
            <div className="messages">
              {messages.map((message) => (
                <div key={message.id} className="message">
                  <p className="supportIdTag">Support Id: #{message.id}</p>
                  <p className="supportMessagetext">{message.text}</p>
                  <button onClick={() => handleToggleChat(message.id)}>
                    Chat
                  </button>
                  {message.isChatOpen && (
                    <div className="chat-box">
                      <div className="chat-replies">
                        {message.replies?.map((reply, index) => (
                          <div
                            key={index}
                            className={`reply ${reply.user.toLowerCase()}`}
                          >
                            <strong>{reply.user}:</strong>{" "}
                            <span>{reply.text}</span>
                          </div>
                        ))}
                      </div>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <button onClick={() => handleMessageSubmit(message.id)}>
                        Send
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "logout" && (
          <div className="logout-content">
            <h2>Are you sure you want to log out?</h2>
            <button onClick={() => logout()}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
