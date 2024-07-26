Employee Management CRUD Application
This project is a simple web application that provides login and registration functionality using React for the frontend and Node.js with Express for the backend. It uses MongoDB for data storage and JWT for authentication. The application allows users to register, log in, and access a protected dashboard where they can manage employee records with basic CRUD operations.

Features
User Registration
User Login
JWT Authentication
Protected Dashboard
Employee Management (CRUD Operations)
Technologies Used
Frontend: React
Backend: Node.js, Express
Database: MongoDB
Authentication: JWT
Password Hashing: bcrypt
Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js
npm
MongoDB
Installation
Clone the repository:
git clone https://github.com/your-username/employee-management-app.git
cd employee-management-app

Install dependencies for the backend:
cd server
npm install

Install dependencies for the frontend:
cd client
npm install


Setup Environment Variables
Create a .env file in the backend directory with the following content:
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Running the Application
Start the backend server:
cd server
node index.js

Start the frontend development server:
cd client
npm start
