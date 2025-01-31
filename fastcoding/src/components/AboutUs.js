import React, { useState, useEffect } from "react";
import "../styles/TermsAndConditions.css";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>FastCoding</strong> - your go-to platform for
        high-quality, pre-written code components and stunning design templates.
      </p>

      <h2>Our Mission</h2>
      <p>
        At FastCoding, we aim to empower developers and designers by providing
        ready-to-use code solutions that save time and enhance productivity.
        Whether you're a beginner or an experienced developer, we have something
        for everyone.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>
          <strong>Pre-Written Code:</strong> Access a wide range of fully
          functional code snippets for various web components.
        </li>
        <li>
          <strong>Premium Designs:</strong> Get professionally crafted UI/UX
          designs ready for integration.
        </li>
        <li>
          <strong>Custom Solutions:</strong> Purchase exclusive design templates
          and get the corresponding code delivered instantly.
        </li>
        <li>
          <strong>Developer-Friendly Approach:</strong> Our resources are
          well-documented, optimized, and easy to integrate into any project.
        </li>
      </ul>

      <h2>Why Choose FastCoding?</h2>
      <ul>
        <li>
          <strong>Time-Saving:</strong> Eliminate the hassle of coding from
          scratch.
        </li>
        <li>
          <strong>Quality Assurance:</strong> Our code and designs go through
          rigorous testing.
        </li>
        <li>
          <strong>Affordable Pricing:</strong> Get top-tier components at
          competitive prices.
        </li>
        <li>
          <strong>Regular Updates:</strong> We continuously expand our
          collection to keep up with the latest trends.
        </li>
      </ul>

      <h2>Our Vision</h2>
      <p>
        FastCoding envisions a future where developers and designers can
        seamlessly collaborate and build amazing projects without limitations.
        We strive to create a hub where creativity meets efficiency.
      </p>

      <h2>Contact Us</h2>
      <p>
        Have questions or need support? Reach out to us at{" "}
        <a href="mailto:fastcodingx@gmail.com">fastcodingx@gmail.com</a>.
      </p>
    </div>
  );
};

export default AboutUs;
