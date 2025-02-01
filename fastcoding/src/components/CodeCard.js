import React, { useState, useEffect } from "react";
import "../styles/CodeCard.css";
import CodeBox from "./Codebox";
import { FaUnlock } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import API_URL from "../config";
import { useUser } from "./UserContext";

const CodeCard = ({ code, index, language, setRefresh }) => {
  const isPaid = true;
  const [bookmark, setBookmark] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const { user } = useUser();

  const addBookmark = async (codeId) => {
    try {
      const response = await fetch(`${API_URL}/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          contentId: codeId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Code added to your bookmark!");
        setIsBookmarked(true);
        setBookmarkId(data._id);
      } else {
        alert("Failed adding code to your bookmark!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Remove bookmark
  const removeBookmark = async (bookmarkId) => {
    try {
      const response = await fetch(`${API_URL}/bookmark/${bookmarkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Code removed from your bookmark!");
        setIsBookmarked(false);
        setBookmarkId(null);
        setRefresh(true);
      } else {
        alert("Failed removing code from your bookmark!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getBookmarks = async () => {
    try {
      const response = await fetch(`${API_URL}/bookmark/user/${user?._id}`);
      const data = await response.json();

      if (response.ok) {
        setBookmark(data);
        const bookmarkedItem = data.find((item) => item.contentId === code._id);
        if (bookmarkedItem) {
          setIsBookmarked(true);
          setBookmarkId(bookmarkedItem._id);
        }
      } else {
        console.error("Error fetching bookmarks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getBookmarks();
    }
  }, [user]);

  const handleBookmarkClick = () => {
    if (isBookmarked && bookmarkId) {
      removeBookmark(bookmarkId);
    } else {
      addBookmark(code._id);
    }
  };

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
      <div
        className={`card-cart-icon ${isBookmarked ? "bookmarked-icon" : ""}`}
        onClick={handleBookmarkClick}
        style={{ color: isBookmarked ? "gold" : "" }}
      >
        <IoMdBookmark size={26} className="icon" />
      </div>
    </div>
  );
};

export default CodeCard;
