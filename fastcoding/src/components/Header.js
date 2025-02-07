import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshake, FaUserPlus } from "react-icons/fa";
import "../styles/Header.css";
import Logo from "../assets/FastCoding.png";
import { GoSearch } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { useUser } from "./UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";

function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="headerContainer">
      <GiHamburgerMenu size={26} className="menuIcon" onClick={toggleSidebar} />
      <div className="logo" onClick={() => handleNavigation("/")}>
        <img src={Logo} alt="Logo" className="logoImage" />
      </div>
      <div className="mobileViewOptions">
        {!user && (
          <button
            className="authButton"
            style={{ marginRight: 5 }}
            onClick={() => handleNavigation("/getintouch")}
          >
            Get In Touch
          </button>
        )}
        {user && (
          <FaHandshake
            size={24}
            className="icon"
            style={{ marginRight: 8 }}
            onClick={() => handleNavigation("/getintouch")}
          />
        )}

        {user && (
          <IoMdBookmark
            size={24}
            className="icon"
            style={{ marginRight: 10 }}
            onClick={() => handleNavigation("/mybookmark")}
          />
        )}
        {!user && (
          <button
            className="authButton"
            onClick={() => handleNavigation("/login")}
          >
            Login
          </button>
        )}
        {user && (
          <MdAccountCircle
            size={24}
            className="icon"
            onClick={handleDropdownToggle}
          />
        )}
        {isDropdownOpen && (
          <div className="accountDropdown">
            <ul>
              <li
                onClick={() => {
                  handleNavigation("/myaccount/profile");
                  handleDropdownToggle();
                }}
              >
                Profile
              </li>
              <li
                onClick={() => {
                  handleNavigation("/myaccount/mycodes");
                  handleDropdownToggle();
                }}
              >
                My Codes
              </li>
              <li
                onClick={() => {
                  handleNavigation("/myaccount/chatsupport");
                  handleDropdownToggle();
                }}
              >
                Support
              </li>
              <li
                onClick={() => {
                  handleNavigation("/myaccount/logout");
                  handleDropdownToggle();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <nav className="navLinks">
        <div className="navIcons">
          <button
            className="getInTouchBtn"
            onClick={() => handleNavigation("/getintouch")}
          >
            <FaHandshake
              size={24}
              className="icon"
              style={{ marginRight: 8 }}
            />
            Get in Touch
          </button>
          {user && (
            <button
              className="myBookmarkBtn"
              onClick={() => handleNavigation("/mybookmark")}
            >
              <IoMdBookmark
                size={24}
                className="icon"
                style={{ marginRight: 8 }}
              />
              My Bookmarks
            </button>
          )}
          {!user && (
            <>
              <button
                style={{ marginRight: 10 }}
                className="authButton"
                onClick={() => handleNavigation("/register")}
              >
                <FaUserPlus
                  size={24}
                  className="icon"
                  style={{ marginRight: 8 }}
                />
                Register
              </button>
              <button
                className="authButton"
                onClick={() => handleNavigation("/login")}
              >
                <FiLogIn
                  size={24}
                  className="icon"
                  style={{ marginRight: 8 }}
                />
                Login
              </button>
            </>
          )}
        </div>
        {user && (
          <div>
            <button
              className="myAccountBtn"
              onClick={() => handleNavigation("/myaccount/profile")}
            >
              <MdAccountCircle
                size={22}
                className="icon"
                style={{ marginRight: 8 }}
              />
              My Account
            </button>
          </div>
        )}
      </nav>
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}
    </div>
  );
}

export default Header;
