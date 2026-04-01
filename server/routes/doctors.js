const express = require('express');
const { getDoctors, getDoctorById, searchDoctors } = require('../controllers/doctorController');
const router = express.Router();

router.get('/', getDoctors);
router.get('/search', searchDoctors);
router.get('/:id', getDoctorById);

module.exports = router;