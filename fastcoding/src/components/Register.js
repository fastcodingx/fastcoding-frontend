import React, { useState } from "react";
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage modal visibility
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("login-main-container")) {
      setIsOpen(false);
      navigate("/")
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="login-main-container" onClick={handleOverlayClick}>
      <div className="login-content">
        <div className="login-content-1">
          <p>Please enter your details</p>
          <div className="login-content-input-1">
            <input name="email" placeholder="Enter Email ID" />
          </div>
          <div className="login-content-input-1">
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="login-content-input-1">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button className="login-content-btn">Register</button>

          <div className="login-footer-content">
            <div className="login-content-google">
              <p style={{ fontSize: "20px" }}>Sign in with Google</p>
              <FcGoogle style={{ height: "30px", width: "30px" }} />
            </div>
            <p
              style={{
                marginTop: "20px",
                color: "var(--secondary)",
                fontSize: "20px",
              }}
            >
              I have an account?{" "}
              <Link to={"/login"} className="login-forgot">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
