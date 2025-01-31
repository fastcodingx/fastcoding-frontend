import { useNavigate } from "react-router-dom";
import { FaHandshake } from "react-icons/fa";
import "../styles/Header.css";
import Logo from "../assets/FastCoding.png";
import { GoSearch } from "react-icons/go";
import { MdAccountCircle } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";

function Header() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const isLogin = true;
  return (
    <div className="headerContainer">
      <div className="logo" onClick={() => handleNavigation("/")}>
        <img src={Logo} alt="Logo" className="logoImage" />
      </div>
      <div className="searchContainer">
        <input placeholder="Search here" />
        <div>
          <GoSearch size={22} style={{ marginRight: 8 }} />
          Search
        </div>
      </div>
      <nav className="navLinks">
        <div className="navIcons">
          <button
            className="getInTouchBtn"
            onClick={() => handleNavigation("/getintouch")}
          >
            <FaHandshake
              size={22}
              className="icon"
              style={{ marginRight: 8 }}
            />
            Get in Touch
          </button>
          {isLogin && (
            <button
              className="myBookmarkBtn"
              onClick={() => handleNavigation("/mybookmark")}
            >
              <IoMdBookmark
                size={22}
                className="icon"
                style={{ marginRight: 8 }}
              />
              My Bookmarks
            </button>
          )}
          {!isLogin && (
            <>
              <button
                style={{ marginRight: 10 }}
                className="authButton"
                onClick={() => handleNavigation("/register")}
              >
                Register
              </button>
              <button
                className="authButton"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
        {isLogin && (
          <div>
            <button
              className="myAccountBtn"
              onClick={() => handleNavigation("/myaccount")}
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
    </div>
  );
}

export default Header;
