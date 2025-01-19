import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import "../styles/Sidebar.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAngular,
  FaPython,
  FaJava,
  FaAndroid,
  FaApple,
  FaDatabase,
  FaPhp,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiReactrouter,
  SiFlutter,
  SiRuby,
  SiTypescript,
  SiGo,
  SiDotnet,
  SiDjango,
  SiFlask,
  SiNextdotjs,
  SiExpress,
  SiLaravel,
} from "react-icons/si";

const sidebarItems = [
  { id: "HTML", icon: <FaHtml5 />, label: "HTML", options: [] },
  { id: "CSS", icon: <FaCss3Alt />, label: "CSS", options: [] },
  { id: "JavaScript", icon: <FaJs />, label: "JavaScript", options: [] },
  {
    id: "React",
    icon: <FaReact />,
    label: "React",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  { id: "NextJs", icon: <SiNextdotjs />, label: "Next.js", options: [] },
  {
    id: "ReactNative",
    icon: <SiReactrouter />,
    label: "React Native",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  {
    id: "Angular",
    icon: <FaAngular />,
    label: "Angular",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  {
    id: "TypeScript",
    icon: <SiTypescript />,
    label: "TypeScript",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  { id: "Python", icon: <FaPython />, label: "Python", options: [] },
  {
    id: "Django",
    icon: <SiDjango />,
    label: "Django",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  {
    id: "Flask",
    icon: <SiFlask />,
    label: "Flask",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  { id: "Java", icon: <FaJava />, label: "Java", options: [] },
  { id: "Kotlin", icon: <FaAndroid />, label: "Kotlin", options: [] },
  { id: "Swift", icon: <FaApple />, label: "Swift", options: [] },
  { id: "Node", icon: <FaNodeJs />, label: "Node.js", options: [] },
  {
    id: "Express",
    icon: <SiExpress />,
    label: "Express",
    options: ["Navbar", "Product Card", "Cart Page"],
  },
  { id: "PHP", icon: <FaPhp />, label: "PHP", options: [] },
  { id: "Laravel", icon: <SiLaravel />, label: "Laravel", options: [] },
  { id: "SQL", icon: <FaDatabase />, label: "SQL", options: [] },
  { id: "Ruby", icon: <SiRuby />, label: "Ruby", options: [] },
  { id: "Go", icon: <SiGo />, label: "Go", options: [] },
  { id: "DotNet", icon: <SiDotnet />, label: ".NET", options: [] },
  { id: "Flutter", icon: <SiFlutter />, label: "Flutter", options: [] },
];

function Sidebar() {
  const [activeItem, setActiveItem] = useState("HTML");
  const [openDropdown, setOpenDropdown] = useState(null);

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
        {sidebarItems.map(({ id, icon, label, options }) => (
          <li key={id} className={activeItem === id ? "active" : ""}>
            <div onClick={() => handleClick(id)} className="sidebar-item">
              {icon} {label}
              {options.length > 0 && (
                <span
                  className={`dropdown-arrow ${
                    openDropdown === id ? "rotate" : ""
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              )}
            </div>
            {openDropdown === id && options.length > 0 && (
              <ul className="dropdown">
                {options.map((option, index) => (
                  <li key={index} className="dropdown-item">
                    {option}
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
