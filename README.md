# Job Portal Backend

REST API backend for the Job Portal application built with Node.js, Express.js, MongoDB, and JWT Authentication.

## Features

* User Authentication
* JWT Authorization
* Admin Role Management
* Job CRUD Operations
* Job Applications
* Resume Upload
* Application Status Management
* Email Notifications
* Dashboard Statistics

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Nodemailer
* bcryptjs

## Installation

```bash
git clone https://github.com/steven-swag/Job-portal-backend.git

cd Job-portal-backend

npm install

npm start
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_app_password
```

## API Modules

### Authentication

* Register User
* Login User

### Jobs

* Create Job
* Update Job
* Delete Job
* Get Jobs
* Get Job By ID

### Applications

* Apply For Job
* View Applications
* View Applicants
* Update Application Status

### Profile

* View Profile
* Update Profile
* Upload Resume

### Dashboard

* Total Users
* Total Jobs
* Total Applications
* Accepted Applications
* Rejected Applications

## Future Enhancements

* Search and Filters
* Pagination
* Saved Jobs
* Interview Scheduling
* Real-Time Notifications
* Analytics Dashboard

## Author

Steven Sharon
