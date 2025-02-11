import React, { useState, useEffect } from "react";
import "../styles/CodeCard.css";
import CodeBox from "./Codebox";
import { FaUnlock } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
import API_URL from "../config";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const CodeCard = ({ code, index, language, setRefresh, payed }) => {
  const [bookmark, setBookmark] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const { user } = useUser();

  // Add Bookmark
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

  // Remove Bookmark
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

  // Get Bookmarks
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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const navigate = useNavigate();
  // Handle Unlock Code (Payment)
  const handleUnlockClick = async (codeId,amount) => {
     if(!user){
      alert("Please login first!")
      navigate("/login");
     }
    try {
      const response = await fetch(`${API_URL}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: "INR",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const options = {
          key: "rzp_live_Mk06fVMWSXegaY", // Add your Razorpay key here
          amount: data.amount,
          currency: data.currency,
          name: "Fast Coding",
          description: "Unlock code for ₹100",
          order_id: data.id,
          handler: async function (response) {
            // Payment Success, Now Verify
            const orderCreated = await fetch(`${API_URL}/order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user._id,
                codeId,
              }),
            });
            const res = await orderCreated.json();
            const verifyResponse = await fetch(`${API_URL}/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: data.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verificationResult = await verifyResponse.json();
            console.log("Respi", response);
            if (verificationResult.success) {
              await fetch(`${API_URL}/order/updateorder/${res._id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  transactionId: response.razorpay_payment_id,
                  paymentStatus: "success",
                }),
              });
              alert("Payment successful! Code unlocked.");
            } else {
              await fetch(`${API_URL}/order/updateorder/${res._id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  transactionId: verificationResult.razorpay_payment_id,
                  paymentStatus: "failed",
                }),
              });
              alert("Payment verification failed.");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        alert("Failed to initiate payment!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="code-card" key={index}>
      <img src={code.image} alt="Code Preview" className="code-card-image" />
     <iframe 
    src={code.image}
    width="640" 
    height="480" 
    allow="autoplay">
</iframe>
      {payed || !code?.isPaid ? (
        <div className="code-card-content">
          <h2>Steps to Follow</h2>
          <ol className="code-card-steps">
            {code.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <CodeBox code={code.code} language={language} css={code.css} />
        </div>
      ) : (
        <div className="addtocart-card">
          <button onClick={() => handleUnlockClick(code._id,code?.amount)}>
            <FaUnlock size={20} />
            Unlock Code ₹{code?.amount}
          </button>
        </div>
      )}

      {!payed && (
        <div
          className={`card-cart-icon ${isBookmarked ? "bookmarked-icon" : ""}`}
          onClick={handleBookmarkClick}
          style={{ color: isBookmarked ? "gold" : "" }}
        >
          <IoMdBookmark size={26} className="icon" />
        </div>
      )}
    </div>
  );
};

export default CodeCard;
