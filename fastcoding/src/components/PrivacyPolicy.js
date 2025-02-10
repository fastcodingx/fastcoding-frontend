import React, { useState, useEffect } from "react";
import "../styles/TermsAndConditions.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to FastCoding! Your privacy is important to us. This Privacy
        Policy explains how we collect, use, and protect your information when
        you use our website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you use our website, we may collect the following types of
        information:
      </p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, payment
          details, and other data provided during registration or purchase.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you interact with
          our website, such as pages visited, time spent, and actions performed.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We use cookies to
          improve user experience and track website analytics.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information collected for the following purposes:</p>
      <ul>
        <li>To provide and improve our services.</li>
        <li>To process transactions and send purchase confirmations.</li>
        <li>To send important updates, newsletters, and promotional offers.</li>
        <li>To enhance security and prevent fraudulent activities.</li>
      </ul>

      <h2>3. Data Protection</h2>
      <p>
        We take data security seriously and implement industry-standard measures
        to protect your information. However, no online platform can guarantee
        complete security.
      </p>

      <h2>4. Sharing Your Information</h2>
      <p>
        We do not sell or rent your personal information. However, we may share
        it with third parties in the following cases:
      </p>
      <ul>
        <li>
          With service providers for payment processing and website maintenance.
        </li>
        <li>When required by law or to protect our legal rights.</li>
        <li>In the event of a business transfer or merger.</li>
      </ul>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, modify, or delete your personal
        information. If you wish to exercise these rights, contact us at{" "}
        <a href="mailto:fastcodingx@gmail.com">fastcodingx@gmail.com</a>.
      </p>

      <h2>6. Cookies and Tracking</h2>
      <p>
        FastCoding uses cookies to enhance user experience and analyze website
        traffic. You can disable cookies in your browser settings, but some
        features may not work properly.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not
        responsible for their privacy practices and encourage you to review
        their policies before sharing personal information.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and continued use of our services signifies
        acceptance of the updated policy.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at <a href="mailto:fastcodingx@gmail.com">fastcodingx@gmail.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
