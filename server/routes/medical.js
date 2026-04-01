const express = require('express');
const { getMedicalRecords } = require('../controllers/medicalController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getMedicalRecords);

module.exports = router;