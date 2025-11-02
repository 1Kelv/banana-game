# 🍌 Banana Game

An interactive puzzle game where users can register, log in, and solve image-based banana challenges.

---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL (via Sequelize ORM)
- **Tools**: VS Code, MySQL Workbench, Netlify (for frontend deployment)

---

## 💡 Features

- User registration & login system
- Stores credentials in MySQL database
- Fetches image-based questions from the Banana API (via HTTP)
- Score logic and validation using JavaScript
- Clean, modular code (low coupling & high cohesion)

---

## 🚀 How to Run Locally

1. Clone the repo
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
3. Start MySQL locally and ensure database banana_game exists
4. Run the backend: node server.js