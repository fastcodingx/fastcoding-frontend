import React from "react";
import "../styles/CodeCard.css";
import CodeBox from "./Codebox";
import { FaUnlock } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";

const CodeCard = ({ code, index, language }) => {
  const isPaid = true;
  return (
    <div className="code-card" key={index}>
      <img src={code.image} alt="Code Preview" className="code-card-image" />
      {isPaid && (
        <div className="addtocart-card">
          <button>
            <FaUnlock size={20} />
            Unlock Code ₹100
          </button>
        </div>
      )}
      {!isPaid && (
        <div className="code-card-content">
          <h2>Steps to Follow</h2>
          <ol className="code-card-steps">
            {code.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <CodeBox code={code.code} language={language} css={code.css} />
        </div>
      )}
      <div className="card-cart-icon">
        <IoMdBookmark size={26} className="icon" />
      </div>
    </div>
  );
};

export default CodeCard;
