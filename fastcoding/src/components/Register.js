import React, { useState } from "react";
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";

const Register = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("login-main-container")) {
      setIsOpen(false);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-main-container" onClick={handleOverlayClick}>
      <div className="login-content">
        <div className="login-content-1">
          <p>Please enter your details</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="login-content-input-1">
              <input
                name="name"
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-content-input-1">
              <input
                name="email"
                type="email"
                placeholder="Enter Email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-content-input-1">
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-content-input-1">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="login-content-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

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
