# 🏡 Wanderlust

A full-stack Airbnb-inspired web application where users can explore, create, edit, and manage property listings — built with Node.js, Express.js, MongoDB, and EJS.

> Built as part of Apna College Delta Full Stack curriculum and extended with additional features.

---

## 🚀 Live Demo
🔗 *(Deploy karo — Render pe free mein hota hai. Link baad mein add karo)*

---

## ✨ Features

- 🏠 Full CRUD — create, browse, edit, delete property listings
- 🔐 User authentication — signup, login, logout (Passport.js + sessions)
- ⭐ Reviews and ratings on listings
- 📸 Image upload support
- 📍 Location-based listing display
- ⚡ Flash messages for real-time user feedback
- 🛠 Clean MVC architecture — models, views, controllers separated
- 🔒 Route protection — only authenticated users can create/edit/delete

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Frontend | EJS (server-side templating), HTML, CSS, Bootstrap |
| Database | MongoDB, Mongoose |
| Auth | Passport.js, Express-Session |
| Environment | dotenv |

---

## 📂 Project Structure

```
wanderlust/
├── models/        → MongoDB schemas (User, Listing, Review)
├── routes/        → Express route handlers
├── views/         → EJS templates
├── controllers/   → Business logic (separated from routes)
├── public/        → Static assets (CSS, JS, images)
├── utils/         → Custom error handling, async wrappers
└── app.js         → Main server entry point
```

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/vanshi9027/wanderlust.git
cd wanderlust

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env
```

Add to `.env`:
```
DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

```bash
# 4. Start the server
node app.js

# Open in browser
http://localhost:8080
```

---

## 📸 Screenshots

*(Add 2–3 screenshots here — Home page, Listing detail page, Login page)*

---

## 🎯 What I Built / Learned

- Designed RESTful routes following MVC pattern
- Implemented full authentication flow with Passport.js (local strategy)
- Built reusable error handling middleware and async wrapper utility
- Integrated MongoDB via Mongoose with schema-level validation
- Managed user sessions and flash messages across routes

---

## 🚧 Planned Improvements

- Map integration (Mapbox / Google Maps)
- Booking and payment system
- Advanced search and filter
- Mobile responsiveness polish

---

## 👩‍💻 Author

**Vanshika Pal**
GitHub: [vanshi9027](https://github.com/vanshi9027)
LinkedIn: [vanshikapal](https://linkedin.com/in/vanshikapal76)
