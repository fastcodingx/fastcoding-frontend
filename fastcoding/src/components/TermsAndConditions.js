import React, { useState, useEffect } from "react";
import "../styles/TermsAndConditions.css";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to FastCoding! These terms and conditions outline the rules and
        regulations for the use of FastCoding's Website, located at
        fastcodingx@gmail.com.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing this website, you agree to comply with and be bound by
        these terms. If you do not agree with any part of these terms, you must
        not use this website.
      </p>

      <h2>2. Use of Our Services</h2>
      <p>
        FastCoding provides pre-written code snippets and design templates for
        developers. Users can browse, purchase, and download these resources for
        their development needs. The use of these resources is subject to the
        licensing terms provided with each purchase.
      </p>

      <h2>3. Payment and Refunds</h2>
      <p>
        Payments for premium resources are non-refundable. Ensure that you
        review the product details before making a purchase. If you encounter
        issues with your download, contact our support team at
        fastcodingx@gmail.com.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All code and design resources on this website are copyrighted by
        FastCoding. Unauthorized redistribution, resale, or modification of the
        provided resources for resale purposes is strictly prohibited. Users may
        use the resources for personal or client projects but cannot claim
        ownership over them.
      </p>

      <h2>5. User Responsibilities</h2>
      <p>
        Users must not use the resources in any way that is illegal, harmful, or
        damages FastCoding's reputation. Any misuse, including attempts to hack,
        reverse engineer, or tamper with the website's functionalities, will
        result in immediate account termination.
      </p>

      <h2>6. Account Security</h2>
      <p>
        Users are responsible for maintaining the confidentiality of their
        account credentials. FastCoding is not liable for any unauthorized
        access resulting from user negligence. If you suspect any security
        breach, contact us immediately.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        FastCoding may contain links to third-party websites for additional
        resources. We are not responsible for the content, privacy policies, or
        practices of third-party sites. Use these links at your own risk.
      </p>

      <h2>8. Service Availability</h2>
      <p>
        While we strive to ensure continuous availability of our services,
        FastCoding does not guarantee uninterrupted access. We may perform
        maintenance, upgrades, or updates that might temporarily limit access to
        our services.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        FastCoding reserves the right to modify these terms at any time.
        Continued use of the website after changes indicates acceptance of the
        new terms. It is recommended that users review these terms periodically.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        FastCoding is not liable for any direct, indirect, incidental, or
        consequential damages arising from the use or inability to use our
        services. This includes loss of data, financial loss, or any other
        damages.
      </p>

      <h2>11. Termination</h2>
      <p>
        We reserve the right to suspend or terminate user access to our services
        if any terms are violated. Termination may be immediate and without
        prior notice.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions about these Terms and Conditions, please
        contact us at fastcodingx@gmail.com.
      </p>
    </div>
  );
};

export default TermsAndConditions;
