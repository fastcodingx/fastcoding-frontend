import React from "react";
import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div id="footerContainer">
      <div className="footerContainer-sec-1">
        <ul>
          <li onClick={() => navigate("/termsandcondition")}>
            Terms & Conditions
          </li>
          <li onClick={() => navigate("/privacypolicy")}>Privacy Policy</li>
          <li onClick={() => navigate("/aboutus")}>About Us</li>
          <li onClick={() => navigate("/getintouch")}>Contact Us</li>
        </ul>
      </div>
      <hr></hr>
      <div
        style={{ textAlign: "center", marginTop: "20px", marginLeft: "290px" }}
      >
        <p>© Copyright 2025 FastCoding. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
