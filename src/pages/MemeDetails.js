import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaUser, FaShareAlt } from "react-icons/fa";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchMeme = async () => {
      const response = await axios.get(`https://api.imgflip.com/get_memes`);
      const memeData = response.data.data.memes.find((m) => m.id === id);
      setMeme(memeData);
      
      // Load likes & comments from localStorage
      setLikes(JSON.parse(localStorage.getItem(`meme-${id}-likes`)) || 0);
      setComments(JSON.parse(localStorage.getItem(`meme-${id}-comments`)) || []);
    };
    fetchMeme();
  }, [id]);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`meme-${id}-comments`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    localStorage.setItem(`meme-${id}-likes`, JSON.stringify(updatedLikes));

    // Store liked meme in user profile
    const likedMemes = JSON.parse(localStorage.getItem("memeLikes")) || {};
    likedMemes[id] = (likedMemes[id] || 0) + 1;
    localStorage.setItem("memeLikes", JSON.stringify(likedMemes));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Meme link copied to clipboard!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 mt-16">
      {meme ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-opacity-30 bg-gray-700 backdrop-blur-lg rounded-xl shadow-xl p-6"
        >
          <motion.img 
            src={meme.url} 
            alt={meme.name} 
            className="w-full rounded-lg shadow-lg" 
            whileHover={{ scale: 1.05 }}
          />
          <h1 className="text-4xl font-extrabold text-center mt-4 drop-shadow-lg">{meme.name}</h1>
          
          <div className="flex justify-around items-center mt-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg transition-all"
            >
              <FaHeart className="mr-2" /> Like ({likes})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg transition-all"
            >
              <FaShareAlt className="mr-2" /> Share
            </motion.button>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Comments</h2>
            <div className="mt-4 space-y-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md" 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.3 }}
                  >
                    <FaUser className="text-gray-400 mr-3" />
                    <p className="text-gray-200">{comment}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400">No comments yet. Be the first to comment!</p>
              )}
            </div>
            <div className="mt-4 flex flex-col">
              <textarea
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-600 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCommentSubmit}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
              >
                Submit Comment
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-gray-400 text-xl">Loading meme details...</p>
      )}
    </div>
  );
};

export default MemeDetails;
