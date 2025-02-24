# 🎭 MemeVerse - The Ultimate Meme Hub 😂  

MemeVerse is a **React-powered** meme-sharing platform where users can explore, upload, and engage with memes dynamically. Featuring infinite scrolling, meme categories, AI-generated captions, and a leaderboard system, MemeVerse is the ultimate destination for meme lovers.  

---

[Live Demo](https://meme-verse-psi.vercel.app/)

## 🚀 Features & Functionalities  

### 🏠 Homepage (Landing Page)  
✅ Displays trending memes dynamically (Fetched from an API).  
✅ Interactive animations & transitions for a smooth UX.  
✅ **Dark Mode Toggle** for an enhanced user experience.  

### 🔍 Meme Explorer Page  
✅ **Infinite Scrolling / Pagination** for endless meme browsing.  
✅ Meme categories filter (**Trending, New, Classic, Random**).  
✅ **Search functionality** with debounced API calls.  
✅ Sort memes by **Likes, Date, or Comments**.  

### 🖼 Meme Upload Page  
✅ Upload memes in **image/GIF format**.  
✅ Add funny captions using a **rich text editor**.  
✅ **AI-generated meme captions** (Powered by a meme-related API).  
✅ **Preview feature** before uploading.  

### 📌 Meme Details Page  
✅ **Dynamic routing** (`/meme/:id`) for each meme.  
✅ Display meme details, likes, comments, and **sharing options**.  
✅ **Comment system** (Stored in LocalStorage for now).  
✅ Like button with **animation & localStorage persistence**.  

### 👤 User Profile Page  
✅ Displays **user-uploaded memes**.  
✅ Edit profile details (**Name, Bio, Profile Picture**).  
✅ View liked memes (Saved in **LocalStorage** or API).  

### 🏆 Leaderboard Page  
✅ **Top 10 most liked memes** displayed.  
✅ **User rankings** based on engagement & meme uploads.  

### ❌ 404 Page (Easter Egg)  
✅ A **fun, meme-based 404 error page** for non-existent routes.  

---

## 🛠️ Tech Stack  

- **Frontend:** React.js ⚛️, Tailwind CSS 🎨  
- **State Management:** useState, useEffect  
- **API Calls:** Fetch API / Axios  
- **Persistence:** LocalStorage  
- **Animations:** Framer Motion  

---

## 🚀 Installation & Setup  

1. Clone the repository:
   ```bash
   git clone https://github.com/NitinBharti007/MemeVerse.git
2. Navigate to project directory:
   ```bash
   cd MemeVerse
3. Run the Development Server
   ```bash
   npm install

---

## 📝 Usage Guide

### 1️⃣ Browsing Memes
- Visit the Meme Explorer Page to explore trending, new, or classic memes.
- Use the search bar to find memes based on keywords.
- Sort memes by likes, date, or comments for a better experience.

### 2️⃣ Uploading Memes
- Go to the Upload Page and select an image/GIF.
- Add a caption (or use AI-generated captions).
- Preview your meme and click **Upload**.

### 3️⃣ Engaging with Memes
- Click ❤️ to like memes (Likes are stored persistently).
- Leave comments (Stored locally for now).
- Share memes with your friends via social media buttons.

### 4️⃣ Managing Your Profile
- Update your **Name, Bio, and Profile Picture**.
- View all memes you've uploaded in one place.
- Browse memes you've liked previously.

### 5️⃣ Leaderboard & Rankings
- Check the **Leaderboard Page** for top-ranking memes.
- Compete to get your meme featured in the **Top 10**.

---

## 📜 License  
This project is open-source and available under the **MIT License**.  

## 📬 Contact  
📩 **Developer:** Nitin Bharti  
🐙 **GitHub:** [@NitinBharti007](https://github.com/NitinBharti007)  
📧 **Email:** [dev.nitin63@gmail.com](mailto:dev.nitin63@gmail.com)  

Enjoy **Meme Explorer** & Keep Sharing Memes! 🎭🔥  
