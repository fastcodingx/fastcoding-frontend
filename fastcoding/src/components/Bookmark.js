import React, { useState, useEffect } from "react";
import CodeCard from "./CodeCard";
import Loading from "./Loading";
import API_URL from "../config";
import "../styles/Bookmark.css";

const Bookmark = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/content/options/React/Header`);
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
  }, []);

  const language = "javascript";

  return (
    <div className="myBookmarkContainer">
      <h1 style={{ textAlign: "center" }}>My Bookmarks</h1>
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

export default Bookmark;
