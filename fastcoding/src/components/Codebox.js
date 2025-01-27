import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBox = ({ code, language, css }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setCode] = useState("Code");

  const handleShowCode = (para) => {
    setCode(para);
  };
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        overflowY: "scroll",
      }}
    >
      <SyntaxHighlighter
        language={language}
        style={materialOceanic}
        wrapLines={true}
        customStyle={{ borderRadius: "10px", padding: "10px" }}
      >
        {showCode === "Code" ? code : css}
      </SyntaxHighlighter>
      {showCode === "CSS" && (
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "80px",
            padding: "5px 10px",
            borderRadius: "3px",
            border: "none",
            backgroundColor: "var(--secondary)",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => handleShowCode("Code")}
        >
          Code
        </button>
      )}
      {showCode == "Code" && (
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "80px",
            padding: "5px 10px",
            borderRadius: "3px",
            border: "none",
            backgroundColor: "var(--secondary)",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => handleShowCode("CSS")}
        >
          CSS
        </button>
      )}
      <CopyToClipboard
        text={showCode === "Code" ? code : css}
        onCopy={handleCopy}
      >
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "10px",
            padding: "5px 10px",
            borderRadius: "3px",
            border: "none",
            backgroundColor: copied ? "#4caf50" : "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CodeBox;
