const router = require('express').Router();
const { getDashboardData } = require('../controllers/dashboardController');

const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

router.get('/stats', protect, isAdmin, getDashboardData);

module.exports = router;
