/* eslint-disable react-refresh/only-export-components */
// ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | null>(null);

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize the theme with localStorage value or fallback to 'bumblebee'
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "bumblebee");

    // Function to toggle the theme
    const toggleTheme = () => {
        const newTheme = theme === "bumblebee" ? "black" : "bumblebee";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    // Set the theme on component mount
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
