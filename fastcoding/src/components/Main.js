import React, { useState, useEffect } from "react";
import "../styles/Main.css";
import CodeCard from "./CodeCard";
import API_URL from "../config";

const Main = () => {
  const [options, setOptions] = useState([]);

  const category = "React";
  const subcategory = "Header";
  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${API_URL}/content/options/${category}/${subcategory}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const language = "javascript"

  return (
    <div className="mainContainer">
      {options.map((code, index) => (
        <>
          <CodeCard code={code} index={index} language={language} />
          <hr style={{ border: "2px solid var(--primary)" }}></hr>
        </>
      ))}
    </div>
  );
};

export default Main;
