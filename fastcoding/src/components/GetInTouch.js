import React, { useState, useEffect } from "react";
import "../styles/GetInTouch.css";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
  };

  return (
    <div className="get-in-touch-container">
      <h1>Get In Touch</h1>
      <p>We would love to hear from you. Reach out to us for any queries.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-icons">
        <a
          href="https://wa.me/+919082846069"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item"
        >
          <FaWhatsapp className="icon whatsapp-icon" />
          <span>Chat with us on WhatsApp</span>
        </a>
        <a href="mailto:fastcodingx@gmail.com" className="contact-item">
          <FaEnvelope className="icon email-icon" />
          <span>Send us an email</span>
        </a>
      </div>
    </div>
  );
};

export default GetInTouch;
