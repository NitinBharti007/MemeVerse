import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MemeCard from "../components/MemeCard";
import DarkModeToggle from "../components/DarkModeToggle";
import { Link } from "react-router-dom";

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(response.data.data.memes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-purple-600 to-blue-500 text-gray-900"
      }`}
    >
      {/* Navbar with Dark Mode Toggle */}
      <div className="flex justify-end items-center p-4 mt-16">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mb-6 px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Trending Memes, Daily!
        </motion.h1>
        <motion.p
          className="text-lg mt-4 text-gray-200 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Explore and share the latest viral memes. Enjoy and keep the laughter going!
        </motion.p>
      </div>

      {/* Meme Grid */}
      <div className="container mx-auto px-6 pb-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {memes.map((meme) => (
              <motion.div
                key={meme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-lg p-2"
              >
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Upload Button */}
      <motion.div
        className="fixed bottom-6 right-6 bg-pink-600 p-4 rounded-full shadow-lg hover:bg-pink-700 transition cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/upload">
          <span className="text-white text-lg font-semibold">➕ Upload Meme</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
