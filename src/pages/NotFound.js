import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
      <h1 className="text-7xl font-extrabold text-red-500 animate-bounce">404</h1>
      <p className="text-2xl mt-4">Oops! This page doesn't exist.</p>
      
      <img
        src="https://i.imgflip.com/1ur9b0.jpg"
        alt="404 meme"
        className="mt-6 w-80 rounded-lg shadow-lg"
      />

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-md transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
