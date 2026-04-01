const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MedicalRecord = require('./models/MedicalRecord');
const User = require('./models/User');

dotenv.config();

// Helpers
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const records = [
  {
    doctor: 'Dr. Sarah Johnson',
    diagnosis: 'Hypertension - Stage 1',
    date: daysAgo(7),
    status: 'Follow-up required',
    notes: 'Blood pressure reading 142/91. Prescribed Lisinopril 10mg daily. Low-sodium diet advised. Follow-up in 4 weeks.',
  },
  {
    doctor: 'Dr. Michael Chen',
    diagnosis: 'Migraine with Aura',
    date: daysAgo(21),
    status: 'Treatment ongoing',
    notes: 'Recurring migraines reported 3-4 times per month. Prescribed Sumatriptan 50mg as needed. MRI ordered.',
  },
  {
    doctor: 'Dr. Emily Davis',
    diagnosis: 'Annual Physical Examination',
    date: daysAgo(45),
    status: 'Completed',
    notes: 'All vitals within normal range. BMI 23.4. Bloodwork results normal. Recommended flu vaccine.',
  },
  {
    doctor: 'Dr. Robert Williams',
    diagnosis: 'Lumbar Strain',
    date: daysAgo(60),
    status: 'Resolved',
    notes: 'Lower back pain from sports activity. Prescribed Ibuprofen 400mg and 2 weeks of physiotherapy. Full recovery confirmed.',
  },
  {
    doctor: 'Dr. Lisa Martinez',
    diagnosis: 'Type 2 Diabetes - Initial Screening',
    date: daysAgo(90),
    status: 'Treatment ongoing',
    notes: 'HbA1c at 6.8%. Metformin 500mg prescribed. Dietary modifications discussed. Monthly glucose monitoring required.',
  },
  {
    doctor: 'Dr. James Wilson',
    diagnosis: 'Acute Dermatitis',
    date: daysAgo(120),
    status: 'Completed',
    notes: 'Contact dermatitis on forearm, likely allergic reaction. Hydrocortisone cream prescribed. Cleared within 10 days.',
  },
];

const seedRecentMedicalHistory = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Please register a user in the app first, then re-run this seed.');
      process.exit(0);
    }

    const recordsWithUser = records.map((r) => ({ ...r, user: user._id }));

    // Remove existing records for this user to avoid duplicates
    await MedicalRecord.deleteMany({ user: user._id });

    await MedicalRecord.insertMany(recordsWithUser);

    console.log(`✅ Seeded ${records.length} recent medical records for ${user.firstName} ${user.lastName}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedRecentMedicalHistory();