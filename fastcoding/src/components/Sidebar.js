import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import API_URL from "../config";

import "../styles/Sidebar.css";
import { FaReact } from "react-icons/fa";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("HTML");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${API_URL}/content`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleClick = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
    setActiveItem(id);
  };

  return (
    <div className="sidebar">
      <ul>
        {category.map((el, id) => (
          <li key={id} className={activeItem === id ? "active" : ""}>
            <div onClick={() => handleClick(id)} className="sidebar-item">
              <FaReact />
              {el?.category}
              {el?.subcategories?.length > 0 && (
                <span
                  className={`dropdown-arrow ${
                    openDropdown === id ? "rotate" : ""
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              )}
            </div>
            {openDropdown === id && el?.subcategories.length > 0 && (
              <ul className="dropdown">
                {el?.subcategories.map((option, index) => (
                  <li key={index} className="dropdown-item">
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
