const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('../models/Doctor');


dotenv.config();

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.8,
    availableToday: true,
    image: "/images/doctor1.jpeg",
    description: "Specializes in heart diseases, hypertension, and preventive cardiology."
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: "12 years",
    rating: 4.7,
    availableToday: false,
    image: "/images/doctor2.jpeg",
    description: "Expert in neurological disorders, migraines, and sleep disorders."
  },
  {
    name: "Dr. Robert Williams",
    specialty: "Orthopedics",
    experience: "18 years",
    rating: 4.9,
    availableToday: true,
    image: "/images/doctor3.jpeg",
    description: "Specializes in joint replacements, sports injuries, and spinal disorders."
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Pediatrics",
    experience: "10 years",
    rating: 4.6,
    availableToday: true,
    image: "/images/doctor4.jpeg",
    description: "Caring for children from infancy through adolescence."
  },
  {
    name: "Dr. James Wilson",
    specialty: "Dermatology",
    experience: "14 years",
    rating: 4.5,
    availableToday: false,
    image: "/images/doctor5.jpeg",
    description: "Expert in skin conditions, cosmetic dermatology, and skin cancer screening."
  },
  {
    name: "Dr. Lisa Martinez",
    specialty: "Internal Medicine",
    experience: "16 years",
    rating: 4.8,
    availableToday: true,
    image: "/images/doctor6.jpeg",
    description: "Comprehensive care for adults, focusing on disease prevention and management."
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Doctor.deleteMany();
    await Doctor.insertMany(doctors);
    console.log('Doctors seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDoctors();