import React, { useEffect } from "react";
import { FaUser, FaGift, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import "../styles/MyAccount.css";
import { useUser } from "./UserContext";
import ChatSupport from "./ChatSupport";
import Profile from "./Profile";
import MyCodes from "./MyCodes";
import Logout from "./Logout";
import { useNavigate, useLocation } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // Get the current path
  const { user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const menuItems = [
    {
      name: "Profile",
      path: "/myaccount/profile",
      icon: <FaUser style={{ marginRight: 10 }} />,
    },
    {
      name: "My Codes",
      path: "/myaccount/mycodes",
      icon: <FaGift style={{ marginRight: 10 }} />,
    },
    {
      name: "Support History",
      path: "/myaccount/chatsupport",
      icon: <FaHeadset style={{ marginRight: 10 }} />,
    },
    {
      name: "Logout",
      path: "/myaccount/logout",
      icon: <FaSignOutAlt style={{ marginRight: 10 }} />,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="my-account-container">
      <div className="profilesidebar">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={pathname === item.path ? "active" : ""}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="maincontent">
        {pathname === "/myaccount/profile" && <Profile />}
        {pathname === "/myaccount/mycodes" && <MyCodes />}
        {pathname === "/myaccount/chatsupport" && (
          <ChatSupport userId={user?._id} />
        )}
        {pathname === "/myaccount/logout" && <Logout />}
      </div>
    </div>
  );
};

export default MyAccount;
