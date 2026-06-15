# Volunteer Registration System

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application developed to manage volunteer registrations efficiently. The system provides secure admin authentication, volunteer management, and CSV report generation.

---

## Project Overview

The Volunteer Registration System simplifies the process of managing volunteer information. Administrators can securely log in, add new volunteers, update existing records, delete volunteers, and download volunteer data as a CSV report.

This project was developed as part of an internship to demonstrate full-stack web development skills using the MERN stack.

---

## Features

* 🔐 Secure Admin Login using JWT Authentication
* ➕ Add New Volunteers
* ✏️ Edit Volunteer Details
* 🗑️ Delete Volunteer Records
* 📋 View All Volunteers
* 📊 Download Volunteer Data as CSV
* 💾 MongoDB Database Integration
* ⚡ Responsive React Frontend
* 🔒 Protected Backend Routes

---

## Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt.js

### Report Generation

* json2csv

---

## Project Structure

```
Volunteer_Registration_System/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/malinibalaji-366/Volunteer_Registration_System.git
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=secretkey
```

---

## API Endpoints

### Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/admin/login |

### Volunteers

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/volunteers     |
| POST   | /api/volunteers/add |
| PUT    | /api/volunteers/:id |
| DELETE | /api/volunteers/:id |

### Reports

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /api/reports/csv |

---

## Screenshots

Add screenshots here after uploading them.

* Login Page
* Admin Dashboard
* Add Volunteer
* Edit Volunteer
* Delete Volunteer
* CSV Report Download
* MongoDB Collection

---

## Future Enhancements

* Search Volunteers
* Filter by Skills
* Pagination
* Dashboard Analytics
* Email Notifications
* Role-Based Access Control
* PDF Report Generation

---

## Learning Outcomes

During this project, I gained hands-on experience with:

* MERN Stack Development
* RESTful API Development
* MongoDB Database Design
* JWT Authentication
* CRUD Operations
* React Hooks
* Express Middleware
* CSV Report Generation
* Git & GitHub Version Control

---

## Author

**Malini Balaji**

GitHub:
https://github.com/malinibalaji-366

---

## License

This project was developed for educational and internship purposes.
