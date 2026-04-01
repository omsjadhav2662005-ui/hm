import { useState } from 'react'

const AppointmentsPage = ({ doctors, onBookAppointment, isLoggedIn, onLoginRequired }) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isLoggedIn) {
      onLoginRequired()
      return
    }

    if (!formData.doctorId || !formData.date || !formData.time || !formData.reason) {
      alert("Please fill in all required fields")
      return
    }

    onBookAppointment(formData)
    
    // Reset form
    setFormData({
      doctorId: '',
      date: '',
      time: '',
      reason: '',
      notes: ''
    })
  }

  return (
    <section id="appointmentsPage">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-2">Book an Appointment</h2>
        <p className="text-gray-600 mb-8">Schedule your visit with our specialists. Check real-time availability and get instant confirmation.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl card-shadow">
              <h3 className="text-xl font-bold font-poppins mb-6">Appointment Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                    <select 
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map(doc => (
                        <option key={doc._id} value={doc._id}>{doc.name} - {doc.specialty}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                    <select 
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    >
                      <option value="">Select reason</option>
                      <option value="consultation">General Consultation</option>
                      <option value="follow-up">Follow-up Visit</option>
                      <option value="checkup">Routine Checkup</option>
                      <option value="symptoms">Specific Symptoms</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                    <textarea 
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      rows="3" 
                      placeholder="Any specific concerns or details you'd like to share with the doctor"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-8">
                  <button 
                    type="submit" 
                    className="w-full bg-hospital-blue text-white p-3 rounded-lg font-bold hover:bg-hospital-dark transition"
                  >
                    Book Appointment Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Appointment Info */}
          <div>
            <div className="bg-hospital-light p-6 rounded-xl">
              <h3 className="text-xl font-bold font-poppins mb-4">Appointment Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                  <span>Instant confirmation of your appointment</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-bell text-accent mt-1 mr-3"></i>
                  <span>Email & SMS reminders before your visit</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-clock text-accent mt-1 mr-3"></i>
                  <span>Average waiting time: 10-15 minutes</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-calendar-alt text-accent mt-1 mr-3"></i>
                  <span>Reschedule or cancel up to 24 hours before</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-user-md text-accent mt-1 mr-3"></i>
                  <span>Consultation time: 15-30 minutes per session</span>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-white rounded-lg">
                <h4 className="font-bold font-poppins mb-2">Need Urgent Care?</h4>
                <p className="text-sm text-gray-600 mb-3">For emergencies, please call our emergency department directly.</p>
                <div className="flex items-center">
                  <i className="fas fa-phone-alt text-danger mr-2"></i>
                  <span className="font-bold text-lg">(555) 123-EMER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentsPage