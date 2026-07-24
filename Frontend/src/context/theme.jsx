import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(
    localStorage.getItem("theme") || "light"
  );

  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.content = theme === "dark" ? "#111018" : "#f9fafb";
  }
  
  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Theme = () => useContext(ThemeContext);