# Job Board & Application Tracker API

A RESTful backend API built using **Node.js, Express.js, and PostgreSQL** that allows users to browse jobs, apply for jobs, and track application statuses. The system also provides admin functionalities for managing companies, job postings, and applications.


## Features

### Authentication & Authorization

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Role-Based Authorization (Admin/User)

### Company Management

* Create Company (Admin)
* Get All Companies
* Get Single Company
* Update Company (Admin)
* Delete Company (Admin)

### Job Management

* Create Job (Admin)
* Get All Jobs
* Get Single Job
* Update Job (Admin)
* Delete Job (Admin)
* Search Jobs
* Filter Jobs
* Sort Jobs
* Pagination

### Application Management

* Apply for Jobs
* View My Applications
* Update Application Status (Admin)

### Validation & Security

* Input Validation using express-validator
* Environment Variables with dotenv
* Protected Routes
* Secure Password Storage

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT (JSON Web Token)
* bcrypt
* express-validator
* dotenv

## Project Structure

job-board-api
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── companyController.js
│   ├── jobController.js
│   └── applicationController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validators.js
│   └── errorMiddleware.js
│
├── routes
│   ├── authRoutes.js
│   ├── companyRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js


## Database Schema

### Users

| Column   | Type         |
| -------- | ------------ |
| id       | SERIAL       |
| name     | VARCHAR(100) |
| email    | VARCHAR(100) |
| password | VARCHAR(255) |
| role     | VARCHAR(20)  |

### Companies

| Column   | Type         |
| -------- | ------------ |
| id       | SERIAL       |
| name     | VARCHAR(100) |
| location | VARCHAR(100) |
| website  | VARCHAR(255) |

### Jobs

| Column      | Type         |
| ----------- | ------------ |
| id          | SERIAL       |
| title       | VARCHAR(100) |
| description | TEXT         |
| salary      | INTEGER      |
| company_id  | INTEGER      |

### Applications

| Column     | Type        |
| ---------- | ----------- |
| id         | SERIAL      |
| user_id    | INTEGER     |
| job_id     | INTEGER     |
| status     | VARCHAR(50) |
| applied_at | TIMESTAMP   |

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/profile  |


### Companies

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/companies     |
| GET    | /api/companies     |
| GET    | /api/companies/:id |
| PUT    | /api/companies/:id |
| DELETE | /api/companies/:id |


### Jobs

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /api/jobs     |
| GET    | /api/jobs     |
| GET    | /api/jobs/:id |
| PUT    | /api/jobs/:id |
| DELETE | /api/jobs/:id |


### Applications

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/applications     |
| GET    | /api/applications/my  |
| PUT    | /api/applications/:id |


## Live API

https://job-board-api-v594.onrender.com

## Installation

### Clone Repository

git clone https://github.com/your-username/job-board-api.git
cd job-board-api

### Install Dependencies

npm install


### Create .env File

```env
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_connection_string
```

### Run Server

```bash
npm run dev
```

---

## Example API Request

### Register User

```http
POST /api/auth/register
```

```json
{
  "name": "Anusha",
  "email": "anusha@gmail.com",
  "password": "123456"
}
```

---

## Future Enhancements

* Refresh Tokens
* Forgot Password API
* Email Notifications
* Company Logo Upload
* Admin Dashboard Analytics
* Swagger Documentation
* Docker Deployment
* Unit Testing with Jest


## Author

**Anusha Vemu**

Aspiring Full Stack Developer | MERN Stack Enthusiast | C++ | Node.js | PostgreSQL
