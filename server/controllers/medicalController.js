const MedicalRecord = require('../models/MedicalRecord');

// @desc    Get user's medical records
// @route   GET /api/medical
// @access  Private
const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ user: req.user._id }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMedicalRecords };