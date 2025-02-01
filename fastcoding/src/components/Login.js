import React, { useState } from "react";
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";
import { useUser } from "./UserContext";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      login(data.userId);
      alert("Login successful!");
      navigate("/");
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
            <button
              className="login-content-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
              Don't have an account?{" "}
              <Link to={"/register"} className="login-forgot">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
