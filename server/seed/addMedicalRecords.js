const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MedicalRecord = require('../models/MedicalRecord');
const User = require('../models/User');

dotenv.config();

const addMedicalRecords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Find a user (e.g., first patient)
    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Register a user first.');
      process.exit();
    }

    const records = [
      {
        user: user._id,
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Hypertension',
        date: new Date('2023-11-10'),
        status: 'Follow-up required',
        notes: 'Blood pressure 140/90, prescribe medication.'
      },
      {
        user: user._id,
        doctor: 'Dr. Emily Davis',
        diagnosis: 'Annual Physical',
        date: new Date('2023-10-05'),
        status: 'Completed',
        notes: 'All vitals normal.'
      },
      {
        user: user._id,
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Migraine Assessment',
        date: new Date('2023-09-15'),
        status: 'Treatment ongoing',
        notes: 'Prescribed migraine medication.'
      }
    ];

    await MedicalRecord.insertMany(records);
    console.log('Medical records added');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

addMedicalRecords();