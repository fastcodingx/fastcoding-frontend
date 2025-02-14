import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("React");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Caraousel");

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
