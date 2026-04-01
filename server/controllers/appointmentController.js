const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  const { doctorId, date, time, reason, notes } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time,
      reason,
      notes,
    });

    // Create notification for the user
    await Notification.create({
      user: req.user._id,
      title: 'Appointment Booked',
      message: `Your appointment with ${doctor.name} on ${new Date(date).toLocaleDateString()} at ${time} has been booked.`,
      type: 'appointment',
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if appointment belongs to user
    if (appointment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    appointment.status = status || appointment.status;
    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // ✅ FIX: use deleteOne() instead of remove()
    await appointment.deleteOne();
    res.json({ message: 'Appointment cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAppointment, getUserAppointments, updateAppointment, cancelAppointment };