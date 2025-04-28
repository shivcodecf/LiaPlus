# Backend - Blog Website

This is the backend for the Blog project, built using **Node.js**, **Express.js**, and **MongoDB**.

It handles **user authentication**, **blog creation**, and **retrieval APIs** with secure JWT token-based authorization.

---

## 🚀 Tech Stack

- **Node.js** (Runtime)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT (JSON Web Tokens)** (Authentication)
- **bcryptjs** (Password Hashing)
- **dotenv** (Environment Variables)
- **Cors** (Cross-Origin Resource Sharing)

🛠️ Installation

```bash

Clone the repository:
git clone https://github.com/shivcodecf/LiaPlus.git

Navigate into the project folder:
cd backend

Install dependencies:
npm install

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the server:
npm run dev


🛡️ Authentication
Signup: Save user with hashed password (bcrypt).

Login: Verify user credentials and generate a JWT token.

Protected Routes: Middleware to verify JWT token from headers.


📸 Features
🔒 Secure password storage using bcrypt

🔐 JWT Authentication and Authorization

📰 CRUD operations for blogs

📚 Author details populated with blogs

⚡ RESTful API standards

🌐 CORS enabled for frontend-backend communication





