import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("Angular");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Footer");

  const updateCategory = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, selectedSubcategory, updateCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
