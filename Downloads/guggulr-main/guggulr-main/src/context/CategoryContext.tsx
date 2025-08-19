import React, { createContext, useState, useContext } from 'react';

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('nuts');

  const value = {
    activeCategory,
    setActiveCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};