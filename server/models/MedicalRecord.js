const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);