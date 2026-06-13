# Job Portal Backend

Backend API for the Job Portal application built with Node.js, Express.js, MongoDB, and Brevo Email API for OTP authentication.

## Installation

```bash
git clone https://github.com/steven-swag/Job-portal-backend.git

cd Job-portal-backend

npm install

npm start
```

## Environment Variables

Create a `.env` file and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key

CLIENT_URL=http://localhost:5173
```

## Features

* OTP Authentication using Brevo Email API
* JWT Authorization
* Role-Based Access Control (Admin/User)
* Job Posting and Management
* Job Applications
* Resume Upload
* Profile Management
* Dashboard Analytics
* MongoDB Atlas Integration

## API Endpoints

### Authentication

* POST `/api/auth/send-otp`
* POST `/api/auth/verify-otp`
* GET `/api/auth/me`

### Jobs

* GET `/api/jobs`
* POST `/api/jobs`
* PUT `/api/jobs/:id`
* DELETE `/api/jobs/:id`

### Applications

* POST `/api/applications/:jobId`
* GET `/api/applications/my-applications`

### Profile

* GET `/api/profile`
* PUT `/api/profile`
* POST `/api/profile/upload-resume`

### Dashboard

* GET `/api/dashboard/stats`

## Live Demo

Frontend:
https://job-portal-frontend-iota-five.vercel.app/

Backend:
https://job-portal-backend-g0mb.onrender.com/

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Multer
* Brevo API
* CORS

## Authentication Flow

1. User enters name and email.
2. OTP is generated and sent using Brevo Email API.
3. User verifies OTP.
4. JWT token is generated.
5. User gains access based on role permissions.

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Author

Steven Sharon
