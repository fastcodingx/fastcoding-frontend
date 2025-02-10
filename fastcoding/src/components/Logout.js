import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from "./UserContext";

const Logout = () => {
  const { logout } = useUser();
  return (
    <div className="logout-content">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={() => logout()}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Logout;
