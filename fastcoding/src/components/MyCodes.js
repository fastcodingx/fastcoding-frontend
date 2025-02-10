import React, { useState, useEffect } from "react";
import API_URL from "../config";
import CodeCard from "./CodeCard";
import Loading from "./Loading";
import { useUser } from "./UserContext";

const MyCodes = () => {
  const { user } = useUser();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/order/getorderbyuserid/${user?._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const orders = await response.json();
      const validOrders = orders.filter(
        (order) => order.paymentStatus === "success"
      );

      // Fetch details for each valid codeId
      const codeDetailsPromises = validOrders.map((order) =>
        fetch(`${API_URL}/content/options/${order.codeId}`).then((res) =>
          res.ok ? res.json() : null
        )
      );

      const codes = (await Promise.all(codeDetailsPromises)).filter(
        (code) => code !== null
      );

      setCodes(codes);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const language = "javascript";
  return (
    <div className="my-codes-content">
      {loading ? (
        <Loading />
      ) : codes.length > 0 ? (
        codes.map((code, index) => (
          <React.Fragment key={index}>
            <CodeCard
              code={code}
              index={index}
              language={language}
              payed={true}
            />
            {index !== codes.length - 1 && (
              <hr style={{ border: "1px solid black" }} />
            )}
          </React.Fragment>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "22px",
              color: "red",
            }}
          >
            You have not unlocked any codes yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCodes;
