// CheckboxProvider.jsx
"use client"

import { createContext, useContext, useState } from 'react';

const CheckboxContext = createContext();

export const CheckboxProvider = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isAnalyst, setIsAnalyst] = useState(false); // Add this line

  return (
    <CheckboxContext.Provider value={{ isChecked, setIsChecked, isAnalyst, setIsAnalyst }}> {/* Update this line */}
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckbox = () => useContext(CheckboxContext);
