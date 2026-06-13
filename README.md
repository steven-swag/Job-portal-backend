# Job Portal Backend

Backend API for the Job Portal application built with Node.js, Express.js, MongoDB, Cloudinary, and Brevo Email API for OTP authentication.

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

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Features

* OTP Authentication using Brevo Email API
* JWT Authorization
* Role-Based Access Control (Admin/User)
* Job Posting and Management
* Job Applications
* Resume Upload using Cloudinary
* Profile Management
* Dashboard Analytics
* MongoDB Atlas Integration
* Secure File Storage with Cloudinary

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

## Resume Upload Flow

1. User uploads a resume (PDF/DOC/DOCX).
2. File is stored securely in Cloudinary.
3. Resume URL is saved in MongoDB.
4. Recruiters can view applicant resumes directly from the Applicants Dashboard.

## Live Demo

**Frontend:** https://job-portal-frontend-iota-five.vercel.app/

**Backend:** https://job-portal-backend-g0mb.onrender.com/

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Multer
* Cloudinary
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
* File Storage: Cloudinary

## Author

Steven Sharon
