import React, { useState, useEffect } from "react";
import "../styles/GetInTouch.css";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import API_URL from "../config";
import { useUser } from "./UserContext";

const GetInTouch = () => {
   const { user, logout } = useUser();
  const [formData, setFormData] = useState({
    userId:user._id,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const emailRes = await emailjs.send(
        "service_46mmahu",
        "template_826cp7r",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Admin",
        },
        "-1_ezH5veZ-0NOZ96"
      );

      if (emailRes.status === 200) {
        const response = await fetch(`${API_URL}/contact/addcontact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Your issue has been submitted successfully!");
          setFormData({ name: "", email: "", message: "" });
        } else {
          throw new Error("Failed to store contact in database");
        }
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
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
