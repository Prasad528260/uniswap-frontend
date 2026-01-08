# 📚 Uniswap — Student Book Exchange Platform

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express" />
  <img src="https://img.shields.io/badge/React-Frontend-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Server-green?logo=node.js" />
  <img src="https://img.shields.io/badge/JWT-Authentication-purple?logo=jsonwebtokens" />
</p>

<p align="center">
  <a href="https://uniswap-frontend-rho.vercel.app">🌐 Live Demo</a> •
  <a href="https://github.com/Prasad528260/uniswap-backend">📦 Backend Repo</a> •
  <a href="https://github.com/Prasad528260/uniswap-frontend">🎨 Frontend Repo</a>
</p>

---

## 🌍 Project Overview

**Uniswap** is a full-stack **MERN application** designed for students to **exchange or sell used books directly with other students**, eliminating unfair reseller practices.

📉 Traditional bookstores typically offer **only ~15%** of a book’s value.  
📈 Uniswap enables **30–45% value recovery** through **peer-to-peer exchanges**, making reselling **fair, transparent, and sustainable**.

---

## 🚀 Real-World Impact

- 💸 **2–3× higher earnings** for students compared to bookstores  
- 🤝 **No middlemen** — direct student-to-student exchange  
- ♻️ Encourages **book reuse & affordability**  
- 🧠 Built around **real resale economics**, not retail profit margins  

---

## 🧩 Key Features

### 📚 Book Exchange Platform
- List, exchange, or buy used books
- Only authenticated users can participate

---

### ✍️ Smart Book Listing
- Add detailed book information:
  - Title
  - Author
  - Subject
  - Condition *(New, Like New, Used, Damaged)*

---

### 💰 Intelligent Pricing Logic
- Dynamic price suggestions based on:
  - Condition
  - Edition
  - Demand
- Ensures sellers earn **more than retail buyback offers**

---

### 🧾 Transaction History
- View past exchanges
- Improves transparency and trust

---

### 🔐 Secure Authentication
- JWT-based signup and login
- Protected routes for all core actions

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- Responsive UI
- Deployed on **Vercel**

### Backend
- **Node.js**
- **Express.js**
- REST APIs for authentication, listings, and pricing logic

### Database
- **MongoDB**
- Stores users, books, and exchange history

---

## ⚙️ Running Locally (Optional)

# 📥 Clone repositories
git clone https://github.com/Prasad528260/uniswap-backend
git clone https://github.com/Prasad528260/uniswap-frontend

# 📂 Navigate to backend directory
cd uniswap-backend

# 📦 Install backend dependencies
npm install

# 🔐 Create environment variables file (DO NOT commit this file)
# .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

# ▶️ Start the backend server
npm run dev

# 🌐 Backend will run at:
# http://localhost:5000


## 🔐 Environment Variables

⚠️ Sensitive environment variables are not included in this repository.  
They are securely managed in the deployment platform (Vercel / server environment).

📄 .env.example files are provided for reference.

---

## 🌐 Deployment

- 🎨 Frontend: Vercel  
- 🧠 Backend: Node.js API server  
- 🗄️ Database: MongoDB Atlas  

👉 Live App: https://uniswap-frontend-rho.vercel.app

---

## 👨‍💻 Author

**Prasad Subhedar**  
Full-Stack Developer  
Focused on building real-world, impact-driven products 🚀

