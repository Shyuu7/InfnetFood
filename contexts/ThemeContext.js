import React, { createContext, useContext, useState } from 'react';
import { getThemeColors } from '../constants/Colors';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const value = {
    isDark,
    toggleTheme: () => setIsDark(prev => !prev),
    colors: getThemeColors(isDark)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);