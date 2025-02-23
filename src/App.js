import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MemeExplorer from './pages/MemeExplorer';
import MemeUpload from './pages/MemeUpload';
import MemeDetails from './pages/MemeDetails';
import UserProfile from './pages/UserProfile';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<MemeExplorer />} />
        <Route path="/upload" element={<MemeUpload />} />
        <Route path="/meme/:id" element={<MemeDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;