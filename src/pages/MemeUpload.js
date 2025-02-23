import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaMagic, FaTimes } from "react-icons/fa";

const MemeUpload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*,video/gif",
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  // Generate AI Caption
  const generateAICaption = async () => {
    setGenerating(true);
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      if (data.success) {
        const randomMeme =
          data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
        setCaption(randomMeme.name);
      }
    } catch (error) {
      console.error("Error fetching AI caption:", error);
    } finally {
      setGenerating(false);
    }
  };

  // Handle Upload and Save to LocalStorage
  const handleUpload = () => {
    if (!file) return alert("Please select an image first!");

    setUploading(true);
    setTimeout(() => {
      const newMeme = { url: file.preview, caption };
      const storedMemes = JSON.parse(localStorage.getItem("userMemes")) || [];
      
      // Save the new meme
      localStorage.setItem("userMemes", JSON.stringify([...storedMemes, newMeme]));

      setUploading(false);
      alert("Meme uploaded successfully! 🎉");
      setFile(null);
      setCaption("");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 p-4 mt-12">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl text-white border border-white/20">
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-white">
          Upload Your Meme
        </h1>

        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer rounded-xl transition duration-300 ease-in-out ${
            isDragActive ? "border-pink-500 bg-pink-900/10" : "border-gray-300/50"
          } hover:border-white hover:bg-white/20`}
        >
          <input {...getInputProps()} />
          <FaUpload className="text-4xl mx-auto text-gray-200 mb-2" />
          {isDragActive ? (
            <p className="text-pink-300 font-semibold">Drop the file here...</p>
          ) : (
            <p className="text-gray-300">Drag & drop a meme here, or click to select one</p>
          )}
        </div>

        {/* Preview */}
        {file && (
          <div className="relative mt-4">
            <button
              className="absolute -top-3 -right-3 bg-red-600 text-white p-1 rounded-full"
              onClick={() => setFile(null)}
            >
              <FaTimes />
            </button>
            <img
              src={file.preview}
              alt="Preview"
              className="w-full h-52 object-cover rounded-xl shadow-lg border border-gray-500/20"
            />
          </div>
        )}

        {/* Caption Input */}
        <div className="relative mt-4">
          <textarea
            placeholder="Add a funny caption..."
            className="w-full p-3 border border-gray-600 bg-gray-800/70 rounded-lg text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            onClick={generateAICaption}
            className="absolute right-3 top-3 p-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-all"
            disabled={generating}
          >
            {generating ? "⏳" : <FaMagic className="text-lg" />}
          </button>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`mt-4 w-full py-3 rounded-lg text-lg font-bold transition-all tracking-wide uppercase shadow-md ${
            uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Meme"}
        </button>
      </div>
    </div>
  );
};

export default MemeUpload;
