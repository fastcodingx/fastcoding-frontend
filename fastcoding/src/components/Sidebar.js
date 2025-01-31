import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import API_URL from "../config";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Sidebar.css";
import { FaReact } from "react-icons/fa";
import { useCategory } from "./CategoryContext";

function Sidebar() {
  const { updateCategory } = useCategory();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("React");
  const [openDropdown, setOpenDropdown] = useState({});
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${API_URL}/content`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategory(data);

      // Initialize all dropdowns as open
      const defaultOpen = data.reduce((acc, curr) => {
        acc[curr.category] = true;
        return acc;
      }, {});
      setOpenDropdown(defaultOpen);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleClick = (categoryName) => {
    setActiveItem(categoryName);
    updateCategory(categoryName, null);

    // Toggle dropdown open/close
    setOpenDropdown((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleSubcategoryClick = (subcategoryName) => {
    updateCategory(activeItem, subcategoryName);
    navigate("/");
  };

  const hiddenRoutes = [
    "/termsandcondition",
    "/privacypolicy",
    "/aboutus",
    "/getintouch",
    "/myaccount",
    "/mybookmark",
  ];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="sidebar">
      <ul>
        {category.map((el, id) => (
          <li key={id} className={activeItem === el.category ? "active" : ""}>
            <div
              onClick={() => handleClick(el?.category)}
              className="sidebar-item"
            >
              <FaReact />
              {el?.category}
              {el?.subcategories?.length > 0 && (
                <span
                  className={`dropdown-arrow ${
                    openDropdown[el.category] ? "rotate" : ""
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              )}
            </div>
            {openDropdown[el.category] && el?.subcategories?.length > 0 && (
              <ul className="dropdown">
                {el?.subcategories.map((option, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSubcategoryClick(option?.name)}
                  >
                    {option?.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
