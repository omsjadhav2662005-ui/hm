const express = require('express');
const { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteAllNotifications   // import the new function
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getNotifications)
  .delete(protect, deleteAllNotifications);  // now it's defined

router.put('/read-all', protect, markAllAsRead);
router.put('/:id/read', protect, markAsRead);

module.exports = router;