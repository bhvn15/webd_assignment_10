# CareerConnect - React Job Portal 🚀

CareerConnect is a responsive job portal built with **React** and **Material UI**, integrated with a **Node.js/Express** backend. This project allows users to securely log in, view job listings, and explore top companies — demonstrating frontend routing, session handling, component structure, and API integration.

---

## 📦 Project Setup

### 🔧 Backend Setup (Node.js)
1. Navigate to the backend directory:
   ```bash
   cd backend
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
npm start
Make sure MongoDB is running locally or update the MongoDB connection string in backend/config/db.js.

💻 Frontend Setup (React)
Go to the root project directory:

bash
Copy
Edit
cd ..
Install dependencies:

bash
Copy
Edit
npm install
Start the React app:

bash
Copy
Edit
npm start

📁 Folder Structure
graphql
Copy
Edit
webd_assignment_9/
├── backend/                    # Express.js backend with REST APIs
│   ├── controllers/           # User controller logic (login, create, etc.)
│   ├── models/                # Mongoose User model
│   ├── routes/                # Express routes
│   ├── config/                # DB & multer setup
│   ├── uploads/               # Uploaded images (static)
│   ├── app.js                 # Express server entry
│   └── package.json
│
├── public/                    # Static assets (favicon, index.html)
│   └── favicon.ico            # Custom favicon
│
├── src/
│   ├── components/            # React components
│   │   ├── Login/             # Login form
│   │   ├── Navbar/            # Top navigation bar
│   │   ├── Home/              # Landing page
│   │   ├── About/             # About page
│   │   ├── Contact/           # Contact page
│   │   ├── JobListings/       # Job listings with dynamic data
│   │   └── CompanyShowcase/   # Company showcase with logos
│   │
│   ├── data/
│   │   └── jobPosts.js        # Static job listings used in frontend
│   │
│   ├── services/
│   │   └── api.js             # Axios instance
│   │
│   ├── theme.js               # Material UI theme config
│   ├── App.js                 # Main app component with routing
│   └── index.js               # React entry point
│
├── .gitignore
├── package.json
└── README.md

🧭 Navigation
Route	Component	Description
/	Login	Login page using email & password
/home	Home	Welcome landing page with CTA buttons
/jobs	JobListings	Displays job openings from static data
/companies	CompanyShowcase	Shows logos of top companies
/about	About	Info about the portal and project scope
/contact	Contact	Static placeholder for contact details

🔑 Key Functionalities
✅ Authentication & Session
Login via existing credentials (email + password)

Secure session storage using sessionStorage

Logout feature clears session and redirects to login

✅ Dynamic Content
Job listings dynamically displayed from a static jobPosts.js file

Company logos shown using simulated API (Clearbit logo URLs)

✅ Material UI Integration
Uses MUI components: AppBar, Cards, Chips, Typography, Grid, Buttons

Centralized theme via theme.js

Clean, consistent, responsive layout

✅ Bonus Features
Framer Motion animations on Home page

Favicon added (public/favicon.ico)

Organized folder structure

Axios abstraction using services/api.js

📌 Notes
Only login is required (no signup) — uses existing credentials

Image upload & user-specific fetch will be handled in Assignment 10

Ensure both frontend (npm start) and backend (npm start inside backend/) are running