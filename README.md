<h1 align="center">
   Employee Management CRUD Application 
</h1>

<h3 align="center">
This project is a simple web application that provides login and registration functionality using React for the frontend and Node.js with Express for the backend. It uses MongoDB for data storage and JWT for authentication. The application allows users to register, log in, and access a protected dashboard where they can manage employee records with basic CRUD operations.
</h3>

<br>


<br><br>



## Features

- *User registration and login:* 

- *JWT-based authentication:* 

- *Protected dashboard page accessible only to authenticated users* 

- *Basic CRUD operations on the dashboard for managing Employees*
  


## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Password Hashing: bcrypt

<br>

# Installation

sh
git clone https://github.com/ChristhurasaRoshan/MERN-SAMPLE.git

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
sh
cd backend
npm install
node index.js


Create a file called .env in the backend folder.
Inside it write this :

- MONGODB_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- PORT=8000




Instead of this link write your database link.

Terminal 2: Setting Up Frontend
sh
cd frontend
npm install
npm start

Now, navigate to localhost:3000 in your browser. 
The Backend API will be running at localhost:8000.





<br>
