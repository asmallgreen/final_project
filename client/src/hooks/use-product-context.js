// ProductContext.js

import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  const updateResults = (newResults) => {
    setResults(newResults);
  };

  return (
    <ProductContext.Provider value={{ results, updateResults }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext 必須在 ProductProvider 中使用');
  }
  return context;
};

export { ProductProvider, useProductContext };
