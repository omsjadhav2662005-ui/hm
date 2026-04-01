const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search doctors
// @route   GET /api/doctors/search
// @access  Public
const searchDoctors = async (req, res) => {
  const { name, specialty, available } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }
  if (specialty) {
    filter.specialty = { $regex: specialty, $options: 'i' };
  }
  if (available === 'true') {
    filter.availableToday = true;
  } else if (available === 'false') {
    filter.availableToday = false;
  }

  try {
    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDoctors, getDoctorById, searchDoctors };