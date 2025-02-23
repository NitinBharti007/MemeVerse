import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [memes, setMemes] = useState([]);
  const [user, setUser] = useState({
    name: "John Doe",
    bio: "Meme enthusiast",
    profilePicture: "https://via.placeholder.com/150",
  });
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || user;
    const storedUploadedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const storedLikedMemes = JSON.parse(localStorage.getItem("memeLikes")) || {};
    const storedMemes = JSON.parse(localStorage.getItem("userMemes")) || [];
    setMemes(storedMemes);

    setUser(storedUser);
    setUploadedMemes(storedUploadedMemes);
    setLikedMemes(Object.entries(storedLikedMemes));
  }, []); // Dependency array fixed

  // Update user profile in localStorage
  const handleUpdateProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };
  const clearMemes = () => {
    localStorage.removeItem("userMemes");
    setMemes([]);
  };

  // Handle meme upload
  const handleMemeUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMeme = {
        id: Date.now(),
        url: reader.result,
      };

      const updatedMemes = [newMeme, ...uploadedMemes];
      setUploadedMemes(updatedMemes);
      localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg mt-20">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center">
        <label htmlFor="profilePic" className="cursor-pointer">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 hover:opacity-80 transition"
          />
        </label>
        <input
          type="text"
          id="profilePic"
          placeholder="Paste image URL"
          className="mt-2 p-2 border rounded-md w-full"
          onChange={(e) => setUser({ ...user, profilePicture: e.target.value })}
        />
      </div>

      {/* Name and Bio Section */}
      <div className="mt-4 text-center">
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="text-2xl font-bold text-center border rounded-md p-2 w-full"
        />
        <textarea
          value={user.bio}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
          className="mt-3 p-2 w-full border rounded-md"
          rows="3"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="mt-4 w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Update Profile
      </button>


      {/* Uploaded Memes Section */}
      <div className="max-w-lg w-full mt-2">
        <h2 className="text-xl font-semibold text-center mb-4">Uploaded Memes</h2>
        <div className="grid grid-cols-2 gap-4">
          {memes.length > 0 ? (
            memes.map((meme, index) => (
              <div key={index} className="relative">
                <img src={meme.url} alt="Meme" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                <p className="text-center text-sm text-gray-400 mt-2">{meme.caption}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">No memes uploaded yet.</p>
          )}
        </div>

        {/* Clear Button */}
        {memes.length > 0 && (
          <button 
            onClick={clearMemes} 
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full">
            Clear All Memes
          </button>
        )}
      </div>

      {/* Liked Memes */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-center">Liked Memes</h2>
        {likedMemes.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {likedMemes.map(([memeId, likes]) => (
              <div key={memeId} className="text-center">
                <p className="text-gray-600 text-sm">Meme ID: {memeId}</p>
                <p className="text-red-500 font-bold">❤️ {likes} Likes</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-2">No liked memes yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
