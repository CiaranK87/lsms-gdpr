# 📚 Language School Management System (LSMS)
A full-stack web application for managing the operations of a small language school. This was developed as the capstone project for my postgraduate diploma in Computer Science.

## 🚀 Project Overview
LSMS provides tools for administrators and teachers to manage student enrolment, class scheduling, teacher assignments, and GDPR-compliant data access. The goal was to simulate a functional administrative system tailored to the needs of a small educational institution.

## 🛠️ Tech Stack
- **Frontend:** React (JavaScript)
- **Backend:** Firebase Functions, Firestore (NoSQL database)
- **Authentication:** Firebase Auth
- **Hosting:** Firebase Hosting

## ✨ Key Features
- User authentication (login and logout)
- Role-based access control for admin and teachers
- Student and teacher record management
- Class scheduling and assignment of students to classes
- GDPR-compliant data handling
- Responsive UI designed with basic styling

## 💡 What I Learned
- Building a full-stack application from scratch
- Integrating Firebase Authentication and Firestore
- Managing state and props in a React application
- Designing around data privacy considerations (GDPR)

## 🔄 Improvements I'd Make Now
- Migrate frontend to **TypeScript**
- Refactor backend logic into a dedicated REST API (e.g., using .NET or Express.js) for greater modularity and testability
- Add **unit and integration tests**
- Implement **CI/CD pipelines**
- Replace Firestore with a relational database (e.g., PostgreSQL) for improved data normalization and querying capabilities

## ⚠️ Current Status
This project is **not currently deployed**, but all code is available for review. It was last run in a Firebase environment and would need minor updates to run locally or redeploy.

## 📂 Project Structure
```
lsms-gdpr/
├── functions/              # Firebase Cloud Functions (backend logic)
├── public/                 # Static assets and hosting files
├── src/                    # React frontend code
│   ├── components/         # Reusable components
│   ├── pages/              # Page-level views
│   └── services/           # API or Firebase services
├── .firebase.json          # Firebase configuration
├── firestore.indexes.json  # Firestore index definitions
└── firestore.rules         # Firestore security rules
```
## 📝 License
This project was built for educational purposes as part of a postgraduate program and is not licensed for commercial use or production deployment.
