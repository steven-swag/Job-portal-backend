const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
connectDB();
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://job-portal-frontend-xwrx.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'server running successfully',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
