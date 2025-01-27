import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBookmark } from "react-icons/fa";
import "../styles/Header.css";
import Logo from "../assets/FastCoding.png";

function Header() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="headerContainer">
      <div className="logo" onClick={() => handleNavigation("/")}>
        <img src={Logo} alt="Logo" className="logoImage" />
      </div>
      <nav className="navLinks">
        <div className="navIcons">
          {/* <FaBookmark
            size={24}
            className="icon"
            onClick={() => handleNavigation("/bookmark")}
          />
          <FaShoppingCart
            size={28}
            className="icon"
            onClick={() => handleNavigation("/cart")}
          /> */}
          <button
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
        </div>
      </nav>
    </div>
  );
}

export default Header;
