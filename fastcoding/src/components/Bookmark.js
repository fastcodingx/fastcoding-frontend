import React, { useState, useEffect } from "react";
import CodeCard from "./CodeCard";
import Loading from "./Loading";
import API_URL from "../config";
import "../styles/Bookmark.css";
import { useUser } from "./UserContext";

const Bookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useUser();

  const getBookmarksAndContent = async () => {
    setLoading(true);
    try {
      const bookmarkResponse = await fetch(
        `${API_URL}/bookmark/user/${user?._id}`
      );
      const bookmarkData = await bookmarkResponse.json();

      if (bookmarkResponse.ok) {
        setBookmark(bookmarkData);

        const contentPromises = bookmarkData.map(async (item) => {
          if (item.contentId) {
            const contentResponse = await fetch(
              `${API_URL}/content/options/${item.contentId}`
            );
            const content = await contentResponse.json();

            if (contentResponse.ok) {
              return content;
            } else {
              console.error("Error fetching content data");
            }
          }
        });

        const contentResults = await Promise.all(contentPromises);
        setContentData(contentResults.filter(Boolean));
      } else {
        console.error("Error fetching bookmarks");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user || refresh) {
      getBookmarksAndContent();
    }
  }, [user, refresh]);

  const language = "javascript";

  return (
    <div className="myBookmarkContainer">
      <h1 style={{ textAlign: "center" }}>My Bookmarks</h1>
      {loading ? (
        <Loading />
      ) : bookmark.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "24px", color: "red" }}>
            No bookmarks yet, add something!
          </p>
        </div>
      ) : (
        contentData.map((code, index) => (
          <React.Fragment key={index}>
            <CodeCard
              code={code}
              index={index}
              language={language}
              setRefresh={setRefresh}
            />
            {index !== contentData.length - 1 && (
              <hr style={{ border: "1px solid black" }} />
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Bookmark;
