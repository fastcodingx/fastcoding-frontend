import React from "react";
import "../styles/CodeCard.css";
import CodeBox from "./Codebox";

const CodeCard = ({ code, index, language }) => {
  return (
    <div className="code-card" key={index}>
      <img
        src={code.image}
        alt="Code Preview"
        className="code-card-image"
        style={{ width: "1000px" }}
      />
      <div className="code-card-content">
        <h2>Steps to Follow</h2>
        <ol className="code-card-steps">
          {code.steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <CodeBox code={code.code} language={language} css={code.css} />
      </div>
    </div>
  );
};

export default CodeCard;
