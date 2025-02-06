import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import API_URL from "../config";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useUser();

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      alert("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
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
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div className="saveChangesBtn">
          <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
