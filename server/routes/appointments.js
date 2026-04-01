const express = require('express');
const { createAppointment, getUserAppointments, updateAppointment, cancelAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getUserAppointments)
  .post(protect, createAppointment);

router.route('/:id')
  .put(protect, updateAppointment)
  .delete(protect, cancelAppointment);

module.exports = router;