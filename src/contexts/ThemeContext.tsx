import { useLocalStorage } from 'hooks';
import React, { createContext, useState, useEffect } from 'react';

/**  Define the theme context */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**  ThemeProvider component to wrap app */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { getItem, setItem } = useLocalStorage();
  const [theme, setTheme] = useState(() => {
    // Check if there's a theme in localStorage, otherwise set default theme
    const storedTheme = getItem('color-theme');
    return storedTheme ? storedTheme : 'light';
  });

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Update localStorage when theme changes
  useEffect(() => {
    // Store the next theme in localStorage
    setItem('color-theme', theme);
    // Toggle the class on documentElement
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
