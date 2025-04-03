# 🧑‍💼 CareerConnect - Admin & Employee Portal (Assignment 10)

This project is an enhanced job portal application that supports **admin** and **employee** user roles with secure **role-based routing** and **Redux** state management.

---

## 🔧 Features Implemented

### ✅ Backend Enhancements
- `POST /user/create` now includes a required `type` field: `"admin"` or `"employee"`
- Validations for:
  - Name (alphabetic)
  - Email format
  - Password complexity
  - Role (`admin` or `employee`)
- `GET /user/getAll` returns all users excluding passwords

---

### ✅ Admin Portal
- **Admin-only routes**: `/admin`, `/employees`, `/add-job`
- **Admin Dashboard** with navigation buttons to:
  - Employee listing
  - Add Job form
- **Add Job** form with fields:
  - Company Name
  - Job Title
  - Description
  - Salary
- **View Employees**: shows table of registered users (name, email, role)

---

### ✅ Employee Portal
- **Employee-only routes**: `/jobs`, `/companies`
- **Job Listings Page**:
  - Displays jobs in responsive cards
  - Handles loading, error, and empty states
- **Company Showcase Page** (placeholder)

---

### ✅ General Features
- 🔐 **Protected Routes** with role-based access using `<ProtectedRoute />`
- 🧠 **Redux** used for global auth state (user, token)
- 🎨 **Material UI** for all components (cards, tables, nav, alerts, etc.)
- 🔄 Persistent Login using Redux Persist
- 🔒 Token passed via headers for secured API calls
- 🧭 Conditional Navbar based on login state and role

---

## 💡 Technologies Used
- React
- React Router
- Redux Toolkit + Redux Persist
- Material UI
- Axios
- Express (Backend)
- MongoDB (Mongoose)

---

## 🚀 How to Run

### 1. Backend
```bash
cd backend
npm install
node server.js
