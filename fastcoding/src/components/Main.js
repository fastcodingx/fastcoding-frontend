import React, { useState, useEffect } from "react";
import "../styles/Main.css";
import CodeCard from "./CodeCard";
import API_URL from "../config";
import { useCategory } from "./CategoryContext";
import Loading from "./Loading";

const Main = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategory, selectedSubcategory } = useCategory();

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/content/options/${selectedCategory || "React"}/${selectedSubcategory || "Header"}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [selectedCategory, selectedSubcategory]);

  const language = "javascript";

  return (
    <div className="mainContainer">
      {loading ? (
        <Loading />
      ) : (
        options.map((code, index) => (
          <React.Fragment key={index}>
            <CodeCard code={code} index={index} language={language} />
            {index !== options.length - 1 && (
              <hr style={{ border: "1px solid black" }} />
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Main;
