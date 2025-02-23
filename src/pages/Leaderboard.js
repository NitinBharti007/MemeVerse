import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        let storedLikes = JSON.parse(localStorage.getItem("memeLikes")) || {};

        let sortedMemes = response.data.data.memes
          .map((meme) => ({
            ...meme,
            likes: storedLikes[meme.id] || Math.floor(Math.random() * 500),
          }))
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);

        setMemes(sortedMemes);
      } catch (err) {
        setError("Failed to load memes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const handleLike = (memeId) => {
    setMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme.id === memeId ? { ...meme, likes: meme.likes + 1 } : meme
      )
    );

    let storedLikes = JSON.parse(localStorage.getItem("memeLikes")) || {};
    storedLikes[memeId] = (storedLikes[memeId] || 0) + 1;
    localStorage.setItem("memeLikes", JSON.stringify(storedLikes));
  };

  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-4xl font-bold text-center mb-6">🏆 Meme Leaderboard 🏆</h1>

      {loading && <p className="text-center">Loading memes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme, index) => (
          <div
            key={meme.id}
            className="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/meme/${meme.id}`, { state: meme })}
          >
            <h2 className="text-xl font-semibold">
              #{index + 1} {meme.name}
            </h2>
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-48 object-cover mt-2 rounded"
            />
            <p className="mt-2 text-gray-600">❤️ Likes: {meme.likes}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating when liking
                handleLike(meme.id);
              }}
            >
              👍 Like
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
