# 🩺 Health Wellness App – Backend

This is the **backend server** for the Health Wellness App – a full-stack application aimed at helping users track wellness goals and book health consultations securely and efficiently.

## 🚀 Features

- 🔐 JWT-based user authentication (register, login)
- 📅 Consultation booking system with cancellation
- 🎯 Goal tracking (CRUD operations)
- ✅ Google reCAPTCHA verification
- 📡 RESTful API built with Express.js and MongoDB

## 🛠️ Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Google reCAPTCHA v2**
- **CORS** & middleware for secure HTTP requests

## 📂 Folder Structure

```
backend/
│
├── controllers/        # Handles business logic
├── models/             # Mongoose models (User, Goal, Consultation)
├── routes/             # API endpoints
├── middleware/         # Auth & reCAPTCHA validation
├── config/             # MongoDB connection and env setup
├── .env                # Environment variables (not committed)
├── server.js           # Main entry point
└── package.json
```

## 🔐 Environment Variables

Create a `.env` file in the root of `backend/` with:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login with email and password

### Goals
- `GET /api/goals` – Fetch user's goals
- `POST /api/goals` – Create a goal
- `PUT /api/goals/:id` – Update a goal
- `DELETE /api/goals/:id` – Delete a goal

### Consultations
- `GET /api/consultation` – Get user's consultations
- `POST /api/consultation` – Book a consultation
- `DELETE /api/consultation/:id` – Cancel a consultation

### For Testing
- `GET /api/consultation/test` – Test consultations api
- `GET /api/goals/test` – Test goal api
- `GET /api/auth/test` – Test auth api

## ✅ Setup & Run

```bash
cd backend
npm install
npm run dev
```

Make sure MongoDB is running and `.env` is properly configured.

## 🛡️ Security

- Passwords are hashed using bcrypt
- Authenticated routes use JWT middleware
- CAPTCHA protects auth endpoints

---

💡 Built with love by the Health Wellness App Team
