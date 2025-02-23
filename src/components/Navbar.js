import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide">
          MemeVerse
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavItem to="/explore">Explore</NavItem>
          <NavItem to="/leaderboard">Leaderboard</NavItem>
          <NavItem to="/profile">Profile</NavItem>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-700 absolute w-full top-full left-0 py-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <NavItem to="/explore" onClick={() => setIsOpen(false)}>
                Explore
              </NavItem>
              <NavItem to="/leaderboard" onClick={() => setIsOpen(false)}>
                Leaderboard
              </NavItem>
              <NavItem to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </NavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ to, children, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Link
      to={to}
      onClick={onClick}
      className="relative px-3 py-2 font-medium transition duration-300 hover:text-gray-300 before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-white before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
    >
      {children}
    </Link>
  </motion.div>
);

export default Navbar;
