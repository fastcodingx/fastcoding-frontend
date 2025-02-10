import { createContext, useState, useContext, useEffect } from "react";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/auth/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("fc-Id");
    if (storedUserId) {
      fetchUserData(storedUserId);
    }
  }, []);

  const login = (userId) => {
    localStorage.setItem("fc-Id", userId);
    fetchUserData(userId);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fc-Id");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
