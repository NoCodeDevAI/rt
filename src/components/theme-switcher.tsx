import React from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { motion } from "framer-motion";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    
    // Update localStorage and HTML class directly to ensure consistent behavior
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Tooltip content={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <div className="flex items-center">
        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isDark 
              ? "bg-default-800 border border-default-700" 
              : "bg-primary-100 border border-primary-200"
          }`}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <motion.div
            className="absolute w-5 h-5 rounded-full flex items-center justify-center"
            animate={{ 
              x: isDark ? "8px" : "-8px",
              backgroundColor: isDark ? "#3b6b97" : "#1a6af9"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Icon 
              icon={isDark ? "lucide:moon" : "lucide:sun"} 
              className="text-white text-sm"
            />
          </motion.div>
        </motion.button>
      </div>
    </Tooltip>
  );
};
