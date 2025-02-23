import React from "react";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      onClick={() => setDarkMode((prev) => !prev)}
      className={`p-3 rounded-full shadow-lg text-lg font-bold focus:outline-none transition-all duration-300 ${
        darkMode ? "bg-gray-800 text-yellow-400" : "bg-yellow-400 text-gray-800"
      }`}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? <FaMoon /> : <FaSun />}
    </motion.button>
  );
};

export default DarkModeToggle;
