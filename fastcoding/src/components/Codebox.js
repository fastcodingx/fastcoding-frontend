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

  const formatCode = (code) => {
    let indentLevel = 0; // To keep track of the current indentation level

    return code
      .replace(/;\s*/g, ";\n") // Add new line after semicolons
      .replace(/({|})/g, "\n$1\n") // Add new lines around braces
      .replace(/>\s*</g, ">\n<") // Add new lines between tags
      .replace(/(\(\s*|\{\s*)/g, "$1\n") // New line after opening parentheses or braces
      .replace(/(\s*\))/g, "\n$1") // New line before closing parentheses
      .replace(/=>\s*/g, " =>\n") // New line after arrow functions

      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();

        // Adjust indentation based on the presence of opening and closing braces
        if (trimmedLine.endsWith("{")) {
          indentLevel++;
        } else if (trimmedLine.startsWith("}")) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        // Apply indentation to the current line
        return " ".repeat(indentLevel * 2) + trimmedLine; // 2 spaces per indent level
      })
      .filter((line) => line.length > 0) // Remove empty lines
      .join("\n"); // Join back into a single string
  };

  const formattedCode = formatCode(code);
  const formattedCSS = formatCode(css);

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
        {/* {showCode == "Code" ? code : css} */}
        {showCode === "Code" ? formattedCode : formattedCSS}
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
