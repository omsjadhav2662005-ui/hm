const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  availableToday: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: 'https://picsum.photos/200?random=',
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);