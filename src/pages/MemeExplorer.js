import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import MemeCard from '../components/MemeCard';

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Trending');
  const [sortBy, setSortBy] = useState('likes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        const memeData = response.data.data.memes;
        setMemes(memeData);
        setFilteredMemes(memeData);
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const handleSearch = useCallback(
    debounce((term) => {
      setFilteredMemes(
        memes.filter((meme) =>
          meme.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }, 300),
    [memes]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, memes, handleSearch]);

  const sortedMemes = [...filteredMemes].sort((a, b) => {
    if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
    if (sortBy === 'date') return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <motion.h1 
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meme Explorer
      </motion.h1>
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search memes..."
          className="p-3 w-full md:w-1/3 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Classic">Classic</option>
          <option value="Random">Random</option>
        </select>
        <select
          className="p-3 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="likes">Sort by Likes</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div 
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      ) : filteredMemes.length === 0 ? (
        <div className="text-center text-xl text-gray-600 dark:text-gray-300 mt-10">
          No memes found. Try a different search term.
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
          {sortedMemes.map((meme) => (
            <motion.div key={meme.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <MemeCard meme={meme} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MemeExplorer;
